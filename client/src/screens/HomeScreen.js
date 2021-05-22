import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { getUserHome, login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { USER_HOME_FAIL, USER_HOME_SUCCESS } from '../constants/userConstants'
import { connectWithWebSocket, registerNewUser } from '../utils/wsConn/wsConn'
import Contacts from '../components/Contacts/Contacts'
import ActivityListScreen from '../screens/ActivityListScreen'
import Dashboard from '../components/Dashboard'
import NicknameLogin from '../components/Videocall/NicknameLogin'

const HomeScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const userHome = useSelector((state) => state.userHome)
  const { loading, error, user } = userHome
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [username, setUsername] = useState()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (user.name) {
        dispatch({ type: USER_HOME_SUCCESS })
        dispatch(getUserHome())
        registerNewUser(userInfo.username)
      }
    }
  }, [dispatch, history, userInfo, user])

  useEffect(() => {
    connectWithWebSocket()
  }, [])

  return (
    <>
      <h1>HomeScreen</h1>
      <div className='home'>
        <h2>Welcome {userInfo.name}</h2>
        {/* <Contacts /> */}
        <NicknameLogin username={username} setUsername={setUsername} />
      </div>
    </>
  )
}

export default HomeScreen
