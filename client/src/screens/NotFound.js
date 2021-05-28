import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
const styles = {
  center: { marginLeft: 'auto', marginRight: 'auto', width: '50%' },
  btn: { fontFamily: 'Prompt', color: '#000' },
  text: { fontSize: '20rem' },
}
const NotFound = () => {
  return (
    <div style={styles.center}>
      <Container>
        <Row>
          <Col>
            <h1 style={styles.text}>OOPS</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to='/'>
              <Button variant='warning' style={styles.btn}>
                GO BACK HOME
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound
