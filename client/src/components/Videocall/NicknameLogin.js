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
    img: { maxWidth: '100%', heigh: 'auto' },
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
        <Col lg={6} md={12} sm={12}>
          <Card>
            <Card.Body>
              <Card.Title style={styles.font}>
                Choose a nickname or log in with your username
              </Card.Title>

              <NicknameInput username={username} setUsername={setUsername} />

              <NicknameSubmitBtn
                handleNicknameSubmitBtn={handleNicknameSubmitBtn}
                handleUseNameSubmitBtn={handleUseNameSubmitBtn}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12}>
          <Image src={image06} rounded style={styles.img} />
        </Col>
      </Row>

      <Row>
        <Col style={styles.top} lg={6} md={12} sm={12}>
          <Image src={image04} rounded style={styles.img} />
        </Col>
        <Col style={styles.margin} lg={6} md={12} sm={12}>
          <Alert variant='danger'>
            Make sure the person you want to conenct with knows the nickname .
          </Alert>
          <Alert variant='warning'>
            Choosing a nickname instead of using the name you chose upon signing
            up, will help you log into the application anonymously. This might
            help you add an extra level of safety when using the application.
          </Alert>
          <Alert variant='info'>
            Read more about kids safety on the internet{' '}
            <Alert.Link href='https://www.consumer.ftc.gov/topics/protecting-kids-online'>
              here
            </Alert.Link>
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
