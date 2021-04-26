import { setLocalStream } from '../../actions/callActions'
import store from '../../store'
const defaultConstrains = { video: true, audio: true }

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream))
    })
    .catch((error) => {
      console.log(
        'An error occurred while trying to get access to local media stream.'
      )
      console.log(error)
    })
}
