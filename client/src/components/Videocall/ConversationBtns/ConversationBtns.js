import React from 'react'
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
} from 'react-icons/md'
import ConversationBtn from './ConversationBtn'
import { hangUp } from '../../../utils/webRTC/webRTCHandler'

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '5%',
    left: '35%',
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8',
  },
  iconEnd: {
    width: '25px',
    height: '25px',
    fill: '#FF3218',
    color: '#FF6E0A',
  },
}

const ConversationBtns = (props) => {
  const {
    localStream,
    localCamEnabled,
    localMicEnabled,
    setCamEnabled,
    setMicEnabled,
  } = props

  const handleMicBtnClikced = () => {
    const micEnabled = localMicEnabled
    localStream.getAudioTracks()[0].enabled = !micEnabled
    console.log('Mic disabled')
    setMicEnabled(!micEnabled)
  }

  const handleCamBtnClicked = () => {
    const camEnabled = localCamEnabled
    localStream.getVideoTracks()[0].enabled = !camEnabled
    console.log('Cam disabled')
    setCamEnabled(!camEnabled)
  }

  const handleHangUpBtnClicked = () => {
    hangUp()
  }

  return (
    <div style={styles.buttonContainer}>
      <ConversationBtn>
        {localMicEnabled ? (
          <MdMic style={styles.icon} onClick={handleMicBtnClikced} />
        ) : (
          <MdMicOff style={styles.icon} onClick={handleMicBtnClikced} />
        )}
      </ConversationBtn>
      <ConversationBtn>
        <MdCallEnd style={styles.iconEnd} onClick={handleHangUpBtnClicked} />
      </ConversationBtn>
      <ConversationBtn>
        {localCamEnabled ? (
          <MdVideocam style={styles.icon} onClick={handleCamBtnClicked} />
        ) : (
          <MdVideocamOff style={styles.icon} onClick={handleCamBtnClicked} />
        )}
      </ConversationBtn>
    </div>
  )
}

export default ConversationBtns
