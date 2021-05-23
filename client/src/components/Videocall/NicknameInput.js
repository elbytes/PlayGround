import React from 'react'

import { Form, Card, Button } from 'react-bootstrap'
const NicknameInput = (props) => {
  const { username, setUsername } = props

  const styles = {
    margin: {
      marginTop: '1rem',
    },
  }
  return (
    <div>
      <Form.Group>
        <Form.Control
          style={styles.margin}
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
