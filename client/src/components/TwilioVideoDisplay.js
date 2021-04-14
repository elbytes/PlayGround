import React, { useRef, useEffect } from 'react'
import TwilioVideo from 'twiliio-video'

const TwilioVideoDisplay = (token) => {
  const localVideoRef = useRef()
  const remoteVideoRef = useRef()

  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true })
    return () => {}
  }, [token])

  return (
    <div>
      <div ref={localVideoRef}></div>
      <div ref={remoteVideoRef}></div>
    </div>
  )
}

export default TwilioVideoDisplay
