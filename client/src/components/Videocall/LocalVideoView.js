import React, { useRef, useEffect } from 'react'

const styles = {
  videoContainer: {
    width: '180px',
    height: '180px',
    position: 'relative',
  },
  videoElement: {
    width: '100%',
    height: '100%',
    borderRadius: '30px',
  },
}
const LocalVideoView = (props) => {
  const { localStream } = props
  const localVideoRef = useRef()
  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current
      localVideo.srcObject = localStream
      localVideo.onloadedmetadata = () => {
        localVideo.play()
      }
    }
  }, [localStream])
  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  )
}

export default LocalVideoView
