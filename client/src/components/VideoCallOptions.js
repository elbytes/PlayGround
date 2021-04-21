import React, { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { io } from 'socket.io-client'

const VideoCallOptions = ({ id }) => {
  const iceServers = {
    iceServer: {
      urls: 'stun.l.google.com:19302',
    },
  }

  const peerConn = new RTCPeerConnection(iceServers)
  const socket = io()
  let roomsList = []
  let localStream, currentRoom

  const clientVideo = useRef()
  const guestVideo = useRef()
  const startCall = () => {
    currentRoom = { id }
    if (!roomsList.includes(currentRoom)) {
      //alert('There is no room with that id')
      return
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        clientVideo.srcObj = stream
        clientVideo.play()
        socket('join', currentRoom)
      })
  }

  socket.emit('room', { id })
  socket.on('room', (room) => {
    roomsList.push(room)
  })

  return (
    <div>
      <h3>VideoCallOptions</h3>
      <p>user: {id}</p>
      <p>{roomsList}</p>
      <Form>
        <Form.Group controlId='exampleForm.ControlInput1'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='text' placeholder='Normal text' />
        </Form.Group>
        <Button type='submit' variant='info' onClick={startCall()}>
          Start Call
        </Button>
      </Form>
      <div>
        <video ref={clientVideo} autoPlay></video>
        <video ref={guestVideo} autoPlay></video>
      </div>
    </div>
  )
}

export default VideoCallOptions
