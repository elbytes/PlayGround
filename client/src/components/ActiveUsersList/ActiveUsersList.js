import React from 'react'
import './ActiveUsersList.css'
import ActiveUsersListItem from './ActiveUsersListItem'
import { connect } from 'react-redux'

const ActiveUsersList = ({ activeUsers }) => {
  return (
    <div className='active_user_list_container'>
      {activeUsers.length === 0 && (
        <p style={{ fontSize: '1.2rem' }}>
          Unfortunately no friends are available now
        </p>
      )}
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
