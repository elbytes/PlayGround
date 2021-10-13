import React, { useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiTerminal } from 'react-icons/fi'
import heart from '../images/heart.png'
import { FiInstagram, FiGithub } from 'react-icons/fi'
const styles = {
  links: {
    textDecoration: 'none',
    color: '#e6e6e6',
    fontSize: '1rem',
    display: 'block',
    textAlign: 'left',
    margin: '0.5rem',
    width: '5%',
  },
  icons: {
    textDecoration: 'none',
    color: '#e6e6e6',
    fontSize: '1rem',
    display: 'inline-block',
    textAlign: 'center',
    margin: '1rem',
    verticalAlign: 'middle',
  },
  footerDiv: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '2%',
    paddingRight: '2%',
    marginTop: '1%',
    display: 'flex',
  },
  text: { fontSize: '1vw', display: 'flex', color: '#e6e6e6' },
  copyRight: { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' },
  vl: {
    borderLeft: '1px solid white',
    height: '7rem',
  },
  input: {
    outline: '0',
    borderTop: '0',
    borderLeft: '0',
    borderRight: '0',
    borderBottom: '2px solid white',
    backgroundColor: '#141414',
    width: '20rem',
    marginRight: '1rem',
    color: 'white',
  },
}
const Footer = () => {
  const [emailInput, setEmailInput] = useState('')

  const submitHandler = async (e) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const email = e.target.value
    e.preventDefault()
    setEmailInput('')
    try {
      await axios.post(
        'http://localhost:5001/api/newsletter',
        {
          email,
        },
        config
      )
      console.log('sending to server')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <footer>
      <Container
        fluid
        className='text-center text-md-left py-4'
        style={{ backgroundColor: '#141414' }}
      >
        <Row style={styles.footerDiv}>
          <Col xs={12} s={12} md={12} lg={4}>
            <h1 style={styles.text}>PlayGround</h1>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://github.com/elbytes/PlayGround'
              style={styles.icons}
            >
              <FiGithub />
            </a>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.instagram.com/playgroundonline/'
              style={styles.icons}
            >
              <FiInstagram />
            </a>
          </Col>
          <Col xs={12} s={12} md={12} lg={4} style={styles.vl}>
            <Link to='/about' style={styles.links}>
              about
            </Link>

            <Link to='/faq' style={styles.links}>
              FAQ
            </Link>

            <Link to='/support' style={styles.links}>
              support
            </Link>
          </Col>
          <Col style={styles.text} xs={12} s={12} md={12} lg={4}>
            <Row>
              <Col>
                <input
                  type='email'
                  style={styles.input}
                  placeholder='email here'
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                ></input>
                <Button
                  variant='outline-light'
                  type='button'
                  onClick={submitHandler}
                >
                  subscribe
                </Button>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='http://elbytes.tech'
                  style={styles.icons}
                >
                  &copy; {new Date().getFullYear()}&nbsp;elBytes&nbsp;
                  <FiTerminal size='1.5rem' />
                  DO LOGIC
                </a>
                <Image src={heart} style={styles.icons} />
                <span>minority owned</span>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
