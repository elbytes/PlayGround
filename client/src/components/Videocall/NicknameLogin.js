import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Image, Row, Col, Card, Alert } from 'react-bootstrap'
import NicknameInput from './NicknameInput'
import NicknameSubmitBtn from './NicknameSubmitBtn'
import { connect } from 'react-redux'
import { setUsername } from '../../actions/dashboardActions'
import { registerNewUser } from '../../utils/wsConn/wsConn'
import image06 from '../../images/06.jpeg'

import image04 from '../../images/04.jpeg'
const NicknameLogin = ({ saveUsername }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [username, setUsername] = useState('')
  const history = useHistory()

  const styles = {
    margin: { marginTop: '1rem', marginBottom: '1rem' },
    top: { top: '1rem' },
    font: { fontFamily: 'Prompt' },
  }
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
          <Card>
            <Card.Body>
              <Card.Title style={styles.font}>
                Choose a nickname or log in with your username
              </Card.Title>
              <Card.Text>
                <Alert variant='danger'>
                  <p>
                    The name you choose here will be displayed to all online
                    users on the application.
                  </p>
                </Alert>
              </Card.Text>

              <NicknameInput username={username} setUsername={setUsername} />

              <NicknameSubmitBtn
                handleNicknameSubmitBtn={handleNicknameSubmitBtn}
                handleUseNameSubmitBtn={handleUseNameSubmitBtn}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Image src={image06} rounded />
        </Col>
      </Row>

      <Row>
        <Col style={styles.top}>
          <Image src={image04} rounded />
        </Col>
        <Col style={styles.margin}>
          <Alert variant='danger'>
            <p>
              Make sure the person you want to conenct with knows the nickname .
            </p>
          </Alert>
          <Alert variant='warning'>
            Choosing a nickname instead of using the name you chose upon signing
            up, will help you log into the application anonymously. This might
            help you add an extra level of safety when using the application.
          </Alert>
          <Alert variant='info'>
            Read more about kids safety on the internet{' '}
            <Alert.Link href='#'>here</Alert.Link>
          </Alert>
        </Col>
      </Row>
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
  return { saveUsername: (username) => dispatch(setUsername(username)) }
}

export default connect(null, mapActionsToProps)(NicknameLogin)
