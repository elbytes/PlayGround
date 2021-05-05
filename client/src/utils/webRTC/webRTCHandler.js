import { setLocalStream, setCallState } from '../../actions/callActions'
import { callStates } from '../../constants/callConstants'
import store from '../../store'
const defaultConstrains = { video: true, audio: true }

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream))
      store.dispatch(setCallState(callStates.CALL_AVAILABLE))
    })
    .catch((error) => {
      console.log(
        'An error occurred while trying to get access to local media stream.'
      )
      console.log(error)
    })
}
