import {
  setLocalStream,
  setCallState,
  setCallRejected,
  setRemoteStream,
  setMessage,
  setActivity,
} from '../../actions/callActions'

import {
  setReceivedMoved,
  setGameStateChange,
} from '../../actions/chessActions'
import {
  setSelectedBook,
  setPrevClickedBook,
  setNextClickedBook,
} from '../../actions/bookActions'
import { setBackDrop } from '../../actions/canvasActions'
import { callStates } from '../../constants/callConstants'
import {
  setCallingDialogueVisibile,
  setCallerUsername,
} from '../../reducers/callReducer'
import store from '../../store'
import * as wss from '../wsConn/wsConn'

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
}
const defaultConstrains = { video: true, audio: true }

const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:13902',
    },
  ],
}
let connectedUserSocketId
let peerConnection
let dataChannel

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream))
      store.dispatch(setCallState(callStates.CALL_AVAILABLE))
      console.log('setting local stream in store')
      createPeerConnection()
      console.log('creating peer connection')
    })
    .catch((err) => {
      console.log(
        'error occured when trying to get an access to get local stream'
      )
      console.log(err)
    })
}

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration)
  const localStream = store.getState().call.localStream

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream)
    console.log('adding localStream track to peerConnection')
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    //dispatch remote stream to store
    store.dispatch(setRemoteStream(stream))
  }

  //incoming data channel messages
  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel

    dataChannel.onopen = () => {
      console.log('peer connection is ready to receive data channel messages')
    }

    dataChannel.onmessage = (event) => {
      store.dispatch(setMessage(true, event.data))
    }
  }

  //outgoing data channel messages
  dataChannel = peerConnection.createDataChannel('chat')

  dataChannel.onopen = () => {
    console.log('chat data channel successfully opened')
  }

  //send ice candidate to other user
  peerConnection.onicecandidate = (event) => {
    console.log('Getting candidates from STUN server')
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId,
      })
      console.log('sending candidates to user')
    }
  }
  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connentionState === 'connected') {
      console.log('successfully connected to peer')
    }
  }
}

export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
  store.dispatch(setCallingDialogueVisibile(true))
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  })
}

export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible) {
    connectedUserSocketId = data.callerSocketId
    store.dispatch(setCallerUsername(data.callerUsername))
    store.dispatch(setCallState(callStates.CALL_REQUESTED))
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    })
  }
}

export const acceptIncomingCall = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  })
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
  console.log('accept incoming call from webRTC handler')
}

export const rejectIncomingCall = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  })
  resetCallData()
}

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogueVisibile(false))
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    //send webRTC offer to establish connection
    sendOffer()
  } else {
    let rejectionReason
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Contact is not able to answer now.'
    } else {
      rejectionReason = 'Call is rejected'
    }
    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason,
      })
    )
    resetCallData()
  }
}

const sendOffer = async () => {
  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer,
  })
}

export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer)
  const answer = await peerConnection.createAnswer()
  await peerConnection.setLocalDescription(answer)
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer,
  })
}

export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer)
}

export const handleCandidate = async (data) => {
  try {
    await peerConnection.addIceCandidate(data.candidate)
    console.log('adding ice candidate')
  } catch (error) {
    console.log('Error occured when trying to add received candidate', error)
  }
}

export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callStates !== callStates.CALL_AVAILABLE
  ) {
    return false
  } else {
    return true
  }
}

export const hangUp = () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
  })

  resetCallDataAfterHangUp()
}

export const handleUserHangedUp = () => {
  resetCallDataAfterHangUp()
}

const resetCallDataAfterHangUp = () => {
  store.dispatch(setRemoteStream(null))
  peerConnection.close()
  peerConnection = null
  createPeerConnection()
  resetCallData()
}

export const resetCallData = () => {
  connectedUserSocketId = null
  store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}

//function for sending chat messages using data channel
export const sendMessageUsingDataChannel = (message) => {
  dataChannel.send(message)
}

//function for handling activity selected
export const handleActivitySelected = (activity) => {
  store.dispatch(setActivity(activity))
}
//chess
export const sendReceivedChessMoveToBoard = (data) => {
  console.log('sending move received from server to store', data)
  store.dispatch(setReceivedMoved(data))
}

export const handleGameStateChange = (data) => {
  store.dispatch(setGameStateChange(data))
}

//canvas
//function that deasl with the draw data received from server
export const handleReceivedDrawData = (drawData) => {
  //need to dispatch the drawData to store here
  // store.dispatch(setDrawDataAction(drawData))
  // console.log('dispatching drawData to store', drawData)
}

export const handleBackDrop = (data) => {
  store.dispatch(setBackDrop(data))
  console.log('dispatching backDrop to store')
}

//function for book selected
export const handleBookSelect = (selected) => {
  store.dispatch(setSelectedBook(selected))
  console.log('dispatching selected book to store', selected)
}

export const handleBookNextClicked = (data) => {
  store.dispatch(setNextClickedBook(data))
  console.log('dispatching next click to store', data)
}

export const handleBookPrevClicked = (data) => {
  store.dispatch(setPrevClickedBook(data))
  console.log('dispatching prev click to store', data)
}
export { connectedUserSocketId }
