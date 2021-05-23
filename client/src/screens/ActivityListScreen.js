import { Row, Col, Container, Card } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActivity } from '../actions/callActions'
import { FaPaintBrush, FaChessKnight, FaBook } from 'react-icons/fa'
import { BsPuzzleFill } from 'react-icons/bs'
import { sendActivity } from '../utils/wsConn/wsConn'
import { connectedUserSocketId } from '../utils/webRTC/webRTCHandler'

const styles = {
  menu: {
    cursor: 'pointer',
    marginBottom: '1em',
    marginTop: '1em',
  },
  menuText: {},
}
const ActivityListScreen = () => {
  const dispatch = useDispatch()
  const handleDrawClicked = () => {
    console.log('handling draw clicked')
    let activityDataToSend = {
      socket: connectedUserSocketId,
      activity: 'draw',
    }
    console.log(activityDataToSend)
    sendActivity(activityDataToSend)
    dispatch(setActivity(activityDataToSend))
  }
  const handleChessClicked = () => {
    console.log('handling chess clicked')
    let activityDataToSend = {
      socket: connectedUserSocketId,
      activity: 'chess',
    }
    console.log(activityDataToSend)
    sendActivity(activityDataToSend)
    dispatch(setActivity(activityDataToSend))
  }
  const handlePuzzleClicked = () => {
    console.log('handling puzzle clicked')
    let activityDataToSend = {
      socket: connectedUserSocketId,
      activity: 'puzzle',
    }
    console.log(activityDataToSend)
    sendActivity(activityDataToSend)
    dispatch(setActivity(activityDataToSend))
  }

  const handleBookClicked = () => {
    let activityDataToSend = {
      socket: connectedUserSocketId,
      activity: 'book',
    }
    console.log(activityDataToSend)
    sendActivity(activityDataToSend)
    dispatch(setActivity(activityDataToSend))
  }
  return (
    <>
      <h4>ACTIVITIES</h4>
      <Row>
        <Col>
          <FaPaintBrush
            size='2em'
            onClick={handleDrawClicked}
            style={styles.menu}
          />
          <h6>Draw</h6>
        </Col>
        <Col>
          <FaChessKnight
            size='2em'
            onClick={handleChessClicked}
            style={styles.menu}
          />
          <h6>Chess</h6>
        </Col>
        <Col>
          <BsPuzzleFill
            size='2em'
            onClick={handlePuzzleClicked}
            style={styles.menu}
          />
          <h6 style={styles.menuText}>Puzzle</h6>
        </Col>
        <Col>
          <FaBook size='2em' onClick={handleBookClicked} style={styles.menu} />
          <h6 style={styles.menuText}>Read</h6>
        </Col>
      </Row>
    </>
  )
}

export default ActivityListScreen
