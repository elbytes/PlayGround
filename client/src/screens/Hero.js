import React from 'react'
import { Row, Col, Button, Container, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import hero from '../images/2_hero_img.png'
const styles = {
  border: { border: '1px solid' },
  heroImage: { maxWidth: '100%', height: 'auto', zIndex: '99' },
  heroText: {
    position: 'relative',
    top: '10%',
    left: '0',
    bottom: '10%',
    color: '#262626	',
    marginBottom: '1%',
    paddingRight: '50%',
  },
  heroTextBlue: {
    color: '#3366CC',
    fontSize: '3vw',
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  heroTitle: {
    backgroundColor: '#262626',
    color: '#ffffff	',
    fontSize: '5vw',
    textAlign: 'left',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  heroBtnContainer: { marginTop: '3rem', marginLeft: '60%' },
  heroBtn: { marginLeft: '1rem', fontFamily: 'Prompt' },
  heroBtnYellow: {
    marginLeft: '1rem',
    color: '#000',
    fontFamily: 'Prompt',
    lineHeight: '200%',
  },
  lineHeight: { lineHeight: '200%', marginRight: '30rem' },
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
            <div style={styles.lineHeight}>
              <h2 style={styles.heroTextBlue}>
                meaningfull ways of connecting
              </h2>
            </div>
            <div>
              <h4 style={styles.lineHeight}> Fight The Distance</h4>
              <h4 style={styles.lineHeight}> with Love</h4>
              <h4 style={styles.lineHeight}>and creativity</h4>
            </div>
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
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Image src={hero} style={styles.heroImage} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
