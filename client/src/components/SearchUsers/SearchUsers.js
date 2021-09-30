import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} inline className='mr-0'>
      <Form.Control
        type='search'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search'
        className='mr-sm-2 ml-sm-5'
        value={keyword}
      ></Form.Control>
      <Button type='submit' variant='primary' className='p-2 btn-sm'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
