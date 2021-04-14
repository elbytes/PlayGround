import React from 'react'
import { Nav } from 'react-bootstrap'

const Dashboard = () => {
    return (
        <>
           <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav> 
        </>
    )
}

export default Dashboard
