import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiTerminal } from 'react-icons/fi'
import heart from '../images/heart.png'
const styles = {
  links: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '1rem',
    display: 'flex',
    textAlign: 'center',
  },
  footerDiv: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '1%',
    display: 'flex',
  },
  text: { fontSize: '1vw', display: 'flex' },
  copyRight: { marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' },
}
const Footer = () => {
  return (
    <footer>
      <Container fluid className='text-center text-md-left'>
        <Row style={styles.footerDiv}>
          <Col>
            {' '}
            <div style={styles.text}>
              <Link to='/about' style={styles.links}>
                about
              </Link>
            </div>
          </Col>
          <Col>
            <div>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/elbytes/PlayGround'
                style={styles.links}
              >
                GitHub
              </a>
            </div>
          </Col>

          <Col>
            <div>
              <Link to='/legal' style={styles.links}>
                legal
              </Link>
            </div>
          </Col>
          <Col>
            &copy; {new Date().getFullYear()}
            <a
              target='_blank'
              rel='noreferrer'
              href='http://elbytes.tech'
              style={styles.links}
            >
              &nbsp;elBytes
              <FiTerminal size='1.5rem' />
              <>DO LOGIC</>
            </a>
          </Col>
          <Col>
            <Image src={heart} />
            <span className='mx-4'>minority owned</span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
