import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Jumbotron, Container } from 'react-bootstrap'
import axios from 'axios'

const ActivityScreen = ({match}) => {
   const [activity, setActivity] = useState([])

   useEffect(()=>{
       const fetchActivity = async () =>{
           const { data } = await axios.get(`/api/activity/${match.params.name}`)
           setActivity(data)
       }

       fetchActivity()
   }, [match])
    
    return (
        <>
        <Jumbotron fluid>
            <Container>
            <h3>
                {activity.name}
            </h3>
            <Link to='/activity' className='btn btn-dark my-3'>Go Back</Link>
            </Container>
            </Jumbotron>
        </>
    )
}

export default ActivityScreen
