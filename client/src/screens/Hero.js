import React from 'react'
import { Row, Col, Button, Container, Image, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import heroOne from '../images/hero_1.png'
import heroTwo from '../images/hero_2.png'
const styles = {
  border: { border: '1px solid' },
  heroImage: { maxWidth: '100%', height: 'auto', display: 'flex' },
  heroText: {
    position: 'relative',
    top: '10%',
    left: '0',
    bottom: '10%',
    color: '#262626	',
    marginBottom: '1%',
    display: 'flex',
  },
  textTwo: {
    fontFamily: 'Prompt',
    lineHeight: '200%',
  },
  heroTitle: {
    backgroundColor: '#262626',
    color: '#ffffff	',
    fontSize: '5vw',
    textAlign: 'left',
    padding: '0.7rem',
  },
  heroBtnContainer: {
    marginTop: '2rem',
    marginBottom: '2rem',
    marginLeft: '6rem',
  },
  heroBtn: { margin: '1rem', fontFamily: 'Prompt' },
  heroBtnYellow: {
    margin: '1rem',
    color: '#000',
    fontFamily: 'Prompt',
  },
  lineHeight: { lineHeight: '200%', marginRight: '30rem' },
  heroTextFighter: {
    fontSize: '3rem',
    fontFamily: 'Montserrat',
    lineHeight: '200%',
    paddingTop: '2rem',
  },
  link: {
    textDecoration: 'none',
  },
}
function Hero() {
  return (
    <div>
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div style={styles.heroText}>
              <h1 style={styles.heroTitle}> PlayGround</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <h4 style={styles.heroTextFighter}>
              meaningful ways of connecting
            </h4>

            <div style={styles.heroBtnContainer}>
              <Link to='/about'>
                <Button variant='info' style={styles.heroBtn}>
                  Learn more
                </Button>
              </Link>
              <Link to='/register'>
                <Button variant='warning' style={styles.heroBtnYellow}>
                  Sign Up
                </Button>
              </Link>
            </div>
            <h3 style={styles.textTwo}>
              PlayGround is a web based video call application with integrated
              activities for kids and families.
            </h3>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Image src={heroTwo} style={styles.heroImage} rounded />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12} className='mt-5'>
            <Alert variant='danger'>
              This is an experimental web application. Please practice child
              safety practices.{' '}
              <Alert.Link
                href='https://www.consumer.ftc.gov/topics/protecting-kids-online'
                syle={styles.link}
              >
                Learn about how to protecting kids online.
              </Alert.Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
