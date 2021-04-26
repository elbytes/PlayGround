import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getFindUser } from '../../actions/userActions'
const SearchContacts = (props) => {
  const [keyword, setkeyword] = useState('')
  const dispatch = useDispatch()
  const userFound = useSelector((state) => state.userFound)

  const inputChangeHandler = (e) => {
    setkeyword(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.onUserFound()
  }

  return (
    <>
      <h3>SearchContacts Componenet</h3>
      <h4>Find a Contact to Start the Call</h4>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          placeholder='Search username'
          className='mr-sm-2 ml-sm-5'
          onChange={inputChangeHandler}
          value={keyword}
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          Find
        </Button>
      </Form>
    </>
  )
}

export default SearchContacts
