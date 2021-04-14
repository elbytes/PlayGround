import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col xs={12}>
                        Copyright &copy; elBytes
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer