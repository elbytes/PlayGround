import React from 'react'
import './ActiveUsersList.css'
import ActiveUsersListItem from './ActiveUsersListItem'
import { connect } from 'react-redux'
// const activeUsers = [
//   {
//     socketId: 123,
//     username: 'Jack',
//   },
//   {
//     socketId: 456,
//     username: 'Jane',
//   },
//   {
//     socketId: 789,
//     username: 'John',
//   },
// ]
const ActiveUsersList = ({ activeUsers }) => {
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

const mapStoreStateToProps = ({ dashboard }) => ({
  ...dashboard,
})
export default connect(mapStoreStateToProps)(ActiveUsersList)
