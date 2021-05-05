import React, { useState } from 'react'
import VideoCallDashboard from './Videocall/VideoCallDashboard'
import ActivityListScreen from '../screens/ActivityListScreen'
import Image from 'react-bootstrap/Image'
import menuIcon from '../images/circle_menu.png'

const Dashboard = () => {
  const [activityListOpenStatus, setActivityListOpenStatus] = useState(false)
  const openActivityListHandler = () => {
    console.log('openning activity list')
    if (activityListOpenStatus) {
      setActivityListOpenStatus(false)
    } else {
      setActivityListOpenStatus(true)
    }
  }
  return (
    <>
      <h2>Dashboard Componenet</h2>
      <div className='float-right'>
        <VideoCallDashboard />
        {activityListOpenStatus ? <ActivityListScreen /> : null}
      </div>
      <div onClick={openActivityListHandler} pointer='hand'>
        <Image src={menuIcon} className='menu-icon' />
      </div>
    </>
  )
}

export default Dashboard
