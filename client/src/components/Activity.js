import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import React from 'react'
import '../index.css'
const Activity = ({activity}) => {
    return (
        <Card className='my-3 p-3 rounded act-card' bg='none'>
            <Link to={`/activity/${activity.name}`}>
                <Card.Img src={activity.image} variant='top' className='act-icon'/>
                <Card.Body>
            <Card.Title>
                <Link to={`/activity/${activity.name}`}>
                    {activity.name}
                </Link>
            </Card.Title>
            </Card.Body>
            </Link>
        </Card>
    )
}

export default Activity
