import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchUsers = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='search'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search'
        value={keyword}
      ></Form.Control>
      <div className='input-group-append'>
        <Button type='submit' variant='primary' className='p-2 btn-sm'>
          Search
        </Button>
      </div>
    </Form>
  )
}

export default SearchUsers
