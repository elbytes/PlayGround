import React from 'react'
import { Button } from 'react-bootstrap'
const NicknameSubmitBtn = ({ handleNicknameSubmitBtn }) => {
  return (
    <div>
      <Button type='submit' variant='danger' onClick={handleNicknameSubmitBtn}>
        Set Nickname
      </Button>
    </div>
  )
}

export default NicknameSubmitBtn
