import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

// const styles = {
//   img: { width: '305px' },
//   sign: {
//     textAlign: 'left',
//     paddingLeft: '0px',
//     marginLeft: '0px',
//   },
//   border: { border: '1px solid' },
// }
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/home'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Row>
      <Col>
        <div lg={6} sm={12} xs={12} md={6}>
          <FormContainer>
            <Card bg='light'>
              <Card.Body>
                <Card.Title>
                  <h1>Sign In</h1>
                </Card.Title>
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Sign In
                  </Button>
                </Form>

                <Row className='py-3'>
                  <Col>
                    New Here?{''}
                    <hr />
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : '/register'
                      }
                    >
                      Sign up&nbsp;
                    </Link>
                    for a free account
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </FormContainer>
        </div>
      </Col>
    </Row>
  )
}

export default LoginScreen
