import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { getUserHome, login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { USER_HOME_FAIL, USER_HOME_SUCCESS } from '../constants/userConstants'
import { connectWithWebSocket } from '../utils/wsConn/wsConn'
import Contacts from '../components/Contacts/Contacts'
import ActivityListScreen from '../screens/ActivityListScreen'
import Dashboard from '../components/Dashboard'
const HomeScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const userHome = useSelector((state) => state.userHome)
  const { loading, error, user } = userHome
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (user.name) {
        dispatch({ type: USER_HOME_SUCCESS })
        dispatch(getUserHome())
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
        <Contacts />
      </div>
      <hr />
      <div className='home'>
        <Dashboard />
      </div>
    </>
  )
}

export default HomeScreen
