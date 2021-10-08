import React from 'react'
import { Button } from 'react-bootstrap'

const styles = {
  btn: {
    margin: '1rem',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  btnContainer: {
    alignItems: 'center',
    fontFamily: 'Prompt',
  },
}

const NicknameSubmitBtn = ({
  handleNicknameSubmitBtn,
  handleUseNameSubmitBtn,
}) => {
  return (
    <div style={styles.btnContainer}>
      <Button
        sm={12}
        md
        lg={6}
        style={styles.btn}
        type='submit'
        variant='success'
        onClick={handleNicknameSubmitBtn}
      >
        Set Nickname
      </Button>
      <Button
        sm={12}
        md
        lg={6}
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
