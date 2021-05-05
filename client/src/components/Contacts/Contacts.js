import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import SearchContacts from './SearchContacts'
import Dashboard from '../Dashboard'

const Contacts = () => {
  const [foundContact, setfoundContact] = useState(false)
  const onUserFoundHandler = (didFoundUSer) => {
    //pretending we find a contac from db
    setfoundContact(true)
  }
  return (
    <div className='border'>
      <h2>Contacts Componenet</h2>
      <h4>To start find a contact</h4>
      {!foundContact ? (
        <SearchContacts onUserFound={onUserFoundHandler} />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}

export default Contacts
