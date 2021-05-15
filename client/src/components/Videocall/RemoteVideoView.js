import React, { useRef, useEffect } from 'react'

const styles = {
  videoContainer: {
    width: '50%',
    height: '150%',
    // borderRadius: '8px',
    // position: 'relative',
    // top: '5%',
    // right: '23%',
  },
  videoElement: {
    width: '100%',
    height: '100%',
  },
}
const RemoteVideoView = (props) => {
  const { remoteStream } = props
  const remoteVideoRef = useRef()

  useEffect(() => {
    if (remoteStream) {
      console.log(remoteStream)
      const remoteVideo = remoteVideoRef.current
      remoteVideo.srcObject = remoteStream
      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play()
      }
    }
  }, [remoteStream])
  return (
    <div style={styles.videoContainer}>
      <span>Remote video view</span>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
    </div>
  )
}

export default RemoteVideoView
