import React from 'react'
import { Alert, Row, Col, Button, Container } from 'react-bootstrap'
import './hero.css'
const styles = {
  heroImage: {
    backgroundImage: 'url(img/2_hero_img.png)',
    height: '700px',
    width: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fill',
    position: 'relative',
  },

  heroText: {
    textAlign: 'left',
    position: 'absolute',
    top: '10%',
    left: '20%',
    bottom: '50%',
    color: '#262626	',
    verticalAlign: '4rem',
  },
  heroTitle: {
    backgroundColor: '#262626',
    color: '#ffffff	',
    fontSize: '6rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    marginBottom: '3rem',
  },
  heroBtnContainer: { marginTop: '10rem', left: '15rem' },
  heroBtn: { marginLeft: '1rem', fontFamily: 'Prompt' },
  heroBtnYellow: { marginLeft: '1rem', color: '#000', fontFamily: 'Prompt' },
  lineHeight: { lineHeight: '4rem', marginRight: '30rem' },
}
function Hero() {
  return (
    <div>
      <Container className='home'>
        <Row>
          <Col lg={4} md={12} sm={12}>
            <Container style={styles.heroTextCol}>
              <div style={styles.heroText}>
                <h1 style={styles.heroTitle}> PlayGround</h1>

                <h2 style={styles.lineHeight}>
                  meaningfull ways of connection
                </h2>
                <Row>
                  <Col>
                    <h4> Fight The Distance With Love, Creativity</h4>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.heroBtnContainer}>
                    {' '}
                    <Button variant='info' style={styles.heroBtn}>
                      Learn more
                    </Button>
                    <Button variant='warning' style={styles.heroBtnYellow}>
                      Sign Up
                    </Button>
                  </Col>
                </Row>
              </div>
            </Container>
          </Col>
          <Col lg={8} md={12} sm={12} style={styles.heroImage}></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
