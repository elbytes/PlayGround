import React, { useState, useEffect } from 'react'
import { getUserHome } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { USER_HOME_SUCCESS } from '../constants/userConstants'
import { connectWithWebSocket, registerNewUser } from '../utils/wsConn/wsConn'
import NicknameLogin from '../components/Videocall/NicknameLogin'

const HomeScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const userHome = useSelector((state) => state.userHome)
  const { user } = userHome
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [username, setUsername] = useState()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (user.name) {
        console.log(userInfo.username)
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
      {userInfo && (
        <div className='home container-md' sm={12} md={12}>
          <h2>Welcome {userInfo.name}</h2>
          <NicknameLogin username={username} setUsername={setUsername} />
        </div>
      )}
    </>
  )
}

export default HomeScreen
