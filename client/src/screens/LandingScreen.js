import React from 'react'
import { Carousel } from 'react-bootstrap'
import carOne from '../images/003.jpeg'
import carTwo from '../images/004.jpeg'
import catThree from '../images/005.jpeg'
import carFour from '../images/006.jpeg'
const LandingScreen = () => {
  return (
    <>
      <h1>Welcome to PlayGround!</h1>

      <Carousel>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={carOne} alt='First slide' />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={carTwo} alt='Second slide' />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={catThree} alt='First slide' />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className='d-block w-100' src={carFour} alt='Second slide' />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default LandingScreen
