import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Image, Row, Col } from 'react-bootstrap'
import NicknameInput from './NicknameInput'
import NicknameSubmitBtn from './NicknameSubmitBtn'
import { connect } from 'react-redux'
import { setUsername } from '../../actions/dashboardActions'
import { registerNewUser } from '../../utils/wsConn/wsConn'
import image02 from '../../images/02.jpeg'
import image03 from '../../images/03.jpeg'
import image04 from '../../images/04.jpeg'
const NicknameLogin = ({ saveUsername }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [username, setUsername] = useState('')
  const history = useHistory()

  const handleNicknameSubmitBtn = () => {
    registerNewUser(username)
    saveUsername(username)
    history.push('/dashboard')
  }

  const handleUseNameSubmitBtn = () => {
    registerNewUser(userInfo.name)
    saveUsername(userInfo.name)
    history.push('/dashboard')
  }
  return (
    <div>
      <Row>
        <Col>
          <NicknameInput username={username} setUsername={setUsername} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NicknameSubmitBtn
            handleNicknameSubmitBtn={handleNicknameSubmitBtn}
            handleUseNameSubmitBtn={handleUseNameSubmitBtn}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={4}>
          <Image src={image02} rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src={image04} rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src={image03} rounded />
        </Col>
      </Row>
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
  return { saveUsername: (username) => dispatch(setUsername(username)) }
}

export default connect(null, mapActionsToProps)(NicknameLogin)
