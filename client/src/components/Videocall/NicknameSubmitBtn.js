import React from 'react'
import { Button } from 'react-bootstrap'

const styles = {
  btn: {
    marginLeft: '1rem',
  },
  btnContainer: {
    alignItems: 'center',
  },
}

const NicknameSubmitBtn = ({
  handleNicknameSubmitBtn,
  handleUseNameSubmitBtn,
}) => {
  return (
    <div style={styles.btnContainer}>
      <Button
        className={styles.btn}
        type='submit'
        variant='success'
        onClick={handleNicknameSubmitBtn}
      >
        Set Nickname
      </Button>
      <Button
        style={styles.btn}
        type='submit'
        variant='danger'
        onClick={handleUseNameSubmitBtn}
      >
        Use Your Name
      </Button>
    </div>
  )
}

export default NicknameSubmitBtn
