import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Image, Container} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import sidePicture from '../images/002.jpg'


const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()
    
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo} = userRegister
    
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
        
    }, [history, userInfo, redirect])

    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else{
            dispatch(register(name, email, username, password))
        }
    }


    return (
        <Container fluid>
            <Row>
            <Col>
        <FormContainer>
            <Card>
              <Card.Body>
                <Card.Title>
                <h1>Sign Up for FREE to start using PlayGround</h1>
                </Card.Title>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name}
                    onChange={(e) => setName(e.target.value)}>  
                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Enter username' value={username}
                    onChange={(e) => setUsername(e.target.value)}>  
                    </Form.Control>
            </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Sign Up
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                Already have an account with PlayGround{''}<hr />
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link> instead</Col>
            </Row>
            </Card.Body>
            </Card>
        </FormContainer>
        </Col>
        <Col>
            <Image src={sidePicture} fluid />
          </Col>
        </Row>
        
        </Container>
    )
}

export default RegisterScreen



// import React, { useState } from 'react'
// import { Form, Button, Card, Container, Image, Row, Col } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
// import sidePicture from '../images/002.jpg'
// import { GoogleLogin } from 'react-google-login'

// const Auth = () => {
//   const [isRegistered, setIsRegistered] = useState(false)
//   const dispatch = useDispatch()

//   const handleSubmit = () => {
//     console.log('submit')
//   }

//   const handleChange = () => {
//     console.log('change')
//   }

//   const switchMode = () => {
//     setIsRegistered((prevIsRegistered) => !prevIsRegistered)
//   }

//   const googleSuccess = (res) => {
//     const result = res?.profileObj
//     const token = res?.tokenId

//     try {
//       dispatch({
//         type: 'AUTH',
//         data: { result, token },
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const googleFailure = (error) => {
//     console.log('Google sign in was unsuccesaful.')
//     console.log(error)
//   }

//   return (
//     <>
//       <h1>AUTH</h1>
//       <Container fluid>
//         <Row>
//           <Col>
//             <Card style={{}} lg={2} xs={6} s={6}>
//               <Card.Body>
//                 <Card.Title>
//                   {isRegistered ? 'Sign In' : 'Sign Up'} to continue
//                 </Card.Title>
//                 <Form onSubmit={handleSubmit}>
//                   {!isRegistered && (
//                     <>
//                       <Form.Group>
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control
//                           type='text'
//                           placeholder='Enter Name'
//                           autoFocus
//                           required
//                         />
//                       </Form.Group>
//                       <Form.Group>
//                         <Form.File
//                           id='exampleFormControlFile1'
//                           label='Avatar'
//                         />
//                       </Form.Group>
//                     </>
//                   )}
//                   <Form.Group controlId='formBasicEmail'>
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       type='email'
//                       placeholder='Enter Email'
//                       required
//                     />
//                     <Form.Text className='text-muted'>
//                       We'll never share your email with anyone else.
//                     </Form.Text>
//                   </Form.Group>

//                   <Form.Group controlId='formBasicPassword'>
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type='password'
//                       placeholder='Password'
//                       required
//                     />
//                   </Form.Group>

//                   {!isRegistered ? (
//                     <>
//                       <Form.Group controlId='formBasicPasswordConfirm'>
//                         <Form.Label>Confirm Password</Form.Label>
//                         <Form.Control
//                           type='password'
//                           placeholder='Confirm Password'
//                           required
//                         />
//                       </Form.Group>
//                     </>
//                   ) : null}

//                   <Form.Group controlId='formBasicCheckbox'>
//                     <Form.Check type='checkbox' label='Check me out' />
//                   </Form.Group>
//                   <Button variant='warning' type='submit' className='mid-blue'>
//                     {isRegistered ? 'Sign In' : 'Sign Up'}
//                   </Button>
//                 </Form>
//                 <Button
//                   onClick={switchMode}
//                   className='light-blue'
//                   variant='info'
//                   style={{ margin: '1rem' }}
//                 >
//                   {!isRegistered
//                     ? 'Already signed up? Sign In'
//                     : "Don't have an account? Sign up to start using PlayGround"}
//                 </Button>
//                 <hr />
//                 <GoogleLogin
//                   clientId='532417792212-8usgub95dl9eocj2li4qcrp05n40an2i.apps.googleusercontent.com'
//                   buttonText='Login with Google'
//                   onSuccess={googleSuccess}
//                   onFailure={googleFailure}
//                   cookiePolicy={'single_host_origin'}
//                 />
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Image src={sidePicture} fluid />
//           </Col>
//         </Row>
//       </Container>
//     </>
//   )
// }

// export default Auth
