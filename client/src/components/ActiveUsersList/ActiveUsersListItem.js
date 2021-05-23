import React from 'react'
import userAvatar from '../../images/userAvatar.png'
import { callToOtherUser } from '../../utils/webRTC/webRTCHandler'

const ActiveUsersListItem = (props) => {
  const { activeUser } = props

  const handleContactItemClicked = () => {
    callToOtherUser(activeUser)
    console.log('calling user')
  }
  return (
    <div className='active_user_list_item' onClick={handleContactItemClicked}>
      <div className='active_user_list_image_container'>
        <img
          className='active_user_list_image'
          src={userAvatar}
          alt='user avatar'
        />
      </div>
      <span className='active_user_list_text'>{activeUser.username}</span>
    </div>
  )
}

export default ActiveUsersListItem
