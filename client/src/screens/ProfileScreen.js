import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col, Card, Image, Container} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else{
            if(!user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
                setUsername(user.username)
            }
        }
        
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else{
            dispatch(updateUserProfile({id: user._id, name, email, username, password}))
        }
    }


    return (
        <Container>
            <Row>
            <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                <h2>User Profile</h2>
                </Card.Title>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name}
                    onChange={(e) => setName(e.target.value)}>
                        
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
                    Update
                </Button>
            </Form>

            </Card.Body>
            </Card>
        </Col>
        </Row>
        </Container>
    )
}

export default ProfileScreen

