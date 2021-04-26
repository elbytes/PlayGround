import React from 'react'
import './ActiveUsersList.css'
import ActiveUsersListItem from './ActiveUsersListItem'
const activeUsers = [
  {
    socketId: 123,
    username: 'Jack',
  },
  {
    socketId: 456,
    username: 'Jane',
  },
  {
    socketId: 789,
    username: 'John',
  },
]
const ActiveUsersList = () => {
  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
        />
      ))}
    </div>
  )
}

export default ActiveUsersList
