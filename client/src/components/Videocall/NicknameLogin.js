import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import NicknameInput from './NicknameInput'
import NicknameSubmitBtn from './NicknameSubmitBtn'
import { connect } from 'react-redux'
import { setUsername } from '../../actions/dashboardActions'
import { registerNewUser } from '../../utils/wsConn/wsConn'
const NicknameLogin = ({ saveUsername }) => {
  const [username, setUsername] = useState('')
  const history = useHistory()

  const handleNicknameSubmitBtn = () => {
    registerNewUser(username)
    saveUsername(username)
    history.push('/dashboard')
  }
  return (
    <div>
      <p>Nickname Login</p>
      <NicknameInput username={username} setUsername={setUsername} />
      <NicknameSubmitBtn handleNicknameSubmitBtn={handleNicknameSubmitBtn} />
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
  return { saveUsername: (username) => dispatch(setUsername(username)) }
}

export default connect(null, mapActionsToProps)(NicknameLogin)
