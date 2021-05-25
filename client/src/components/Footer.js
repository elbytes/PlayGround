import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <Container fluid className='text-center text-md-left'>
        <Row>
          <Col xs={12} md={6}>
            <h5 className='title'>PlayGround</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <ul>
              <li className='list-unstyled'>
                <a href='#!'>Link 4</a>
              </li>
            </ul> */}
          </Col>
          <Col>
            <ul>
              <li className='list-unstyled'>
                <a href='#!'>Link 1</a>
              </li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li className='list-unstyled'>
                <a href='#!'>Link 1</a>
              </li>
            </ul>
          </Col>
          <Col>
            <ul>
              <li className='list-unstyled'>
                <a href='#!'>Link 1</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <div className='footer-copyright text-center py-3'>
            <Container fluid>
              &copy; {new Date().getFullYear()} Copyright:{' '}
              <a href='https://www.mdbootstrap.com'> MDBootstrap.com </a>
            </Container>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
