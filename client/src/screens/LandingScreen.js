import React from 'react'
import { Container, Jumbotron } from 'react-bootstrap'
import Hero from './Hero'
import BookIndex from '../components/Books/BookIndex'
const LandingScreen = () => {
  return (
    <div className='container-landing'>
      <BookIndex />
    </div>
  )
}

export default LandingScreen
