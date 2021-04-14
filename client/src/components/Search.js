import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Search = ({history}) => {
    const [keyword, setkeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else{
            history.push('/home')
        }
    }
    return (
        <Form onSubmit={ submitHandler } inline>
            <Form.Control type='text' name='q' onChange={(e)=> setkeyword(e.target.value)} placeholder='Search username' className='mr-sm-2 ml-sm-5'> 
            </Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Find</Button>
        </Form>
    )
}

export default Search
