import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dashboard from '../images/dashboard.png'
const styles = {
  links: { textDecoration: 'none', color: '#eb6864' },
  image: { width: '90%', display: 'flex' },
  text: { lineHeight: '200%', fontSize: '1.2em' },
  titles: { lineHeight: '300%' },
}
const About = () => {
  return (
    <div>
      <Container fluid className='home p-5'>
        <h2 style={styles.titles}>What is PlayGround?</h2>
        <p style={styles.text}>
          The PlayGround project was defined with a goal to shorten the distance
          between kids and their peers or their families and fill in where
          FaceTime and other video call applications fall short. It was designed
          as a tool to provide meaningful ways of communication where online
          playdates get stale. PlayGround gives kids the opportunity to engage
          in creative and collaborative activities with their peers or family,
          while maintaining the face to face experience needed for social
          wellbeing.
        </p>
        <p style={styles.text}>
          PlayGround was born out of a need. A need that I saw with my own eyes
          and experienced with all my heart. It felt like an obvious answer to
          the problem we, as a family were facing and I was so inspired by it
          that I had no hesitation to start it.
        </p>
        <h3 style={styles.titles}>Getting Started</h3>
        <p style={styles.text}>
          To get started with PlayGround you need to{' '}
          <Link to='/register'>register</Link> or{' '}
          <Link to='/login' style={styles.links}>
            login{' '}
          </Link>
          if you have already registered.
        </p>
        <p style={styles.text}>
          After logining in, you will be redirected to the Dashboard.
        </p>
        <Row>
          <Col xs={12} md lg={8}>
            <Image src={dashboard} style={styles.image} />
          </Col>
          <Col xs={12} md lg={4}>
            <p style={styles.text}>
              This is where you get to choose how you want to be identified in
              the PlayGround. You have two options here:
            </p>
            <li style={styles.text}>
              Use the name under which you have logged in to the website
            </li>
            <br />
            <p style={styles.text}>
              If you choose 'Use Your Name' option, your name will be displayed
              to all the online users.
            </p>
            <li style={styles.text}>Create a temporary nickname</li>
            <br />
            <p style={styles.text}>
              By entering a name into Nickname field and choosing 'Set
              Nickname', this nickname will be displayed as your identity in
              PlayGround. This nickname will be temporary and non-unique. to all
              the online users.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About
