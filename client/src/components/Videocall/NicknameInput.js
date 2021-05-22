import React from 'react'

import { Form } from 'react-bootstrap'
const NicknameInput = (props) => {
  const { username, setUsername } = props

  return (
    <div>
      <p>Choose a nickname or log in with your username</p>
      <Form.Group>
        <Form.Control
          size='lg'
          type='text'
          value={username}
          placeholder='Nickname'
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <br />
      </Form.Group>
    </div>
  )
}

export default NicknameInput
