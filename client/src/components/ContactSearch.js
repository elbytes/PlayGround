import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { findUser } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const ContactSearch = () => {
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      dispatch(findUser(keyword))
    }
  }

  useEffect(() => {
    dispatch(findUser(keyword))
  }, [dispatch, keyword])

  return (
    <div>
      <p>ContactSearch</p>
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Users'
          className='mr-sm-2 mk-sm-5'
        ></Form.Control>
        <Button
          type='submit'
          variant='outline-sucess'
          className='p-2 btn btn-secondary'
        >
          Search
        </Button>
      </Form>
    </div>
  )
}

export default ContactSearch
