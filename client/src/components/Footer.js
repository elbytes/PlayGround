import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const styles = {
  links: { textDecoration: 'none', color: '#000', fontSize: '1vw' },
  footerDiv: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '5%',
    marginTop: '1%',
    marginBottom: '0.1%',
    bottom: '0px',
  },
}
const Footer = () => {
  return (
    <footer>
      <Container fluid className='text-center text-md-left'>
        <Row style={styles.footerDiv}>
          <Col>
            {' '}
            <div>
              <Link to='/about' style={styles.links}>
                about
              </Link>
            </div>
          </Col>
          <Col>
            <div>
              <a
                href='https://github.com/elbytes/PlayGround'
                style={styles.links}
              >
                on GitHub
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
            &copy; {new Date().getFullYear()} Copyright:
            <a
              target='_blank'
              rel='noreferrer'
              href='https://github.com/elbytes/PlayGround'
              style={styles.links}
            >
              &nbsp;elBytes
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
