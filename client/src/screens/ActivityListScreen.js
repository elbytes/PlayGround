import { Row, Col, Container, Card } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActivity } from '../actions/callActions'
import { FaPaintBrush, FaChessKnight, FaBook } from 'react-icons/fa'
import { BsPuzzleFill } from 'react-icons/bs'
import { sendActivity } from '../utils/wsConn/wsConn'
const styles = {
  menu: {
    cursor: 'pointer',
    marginBottom: '1em',
    marginTop: '1em',
  },
  menuText: {},
}
const ActivityListScreen = () => {
  // const [selectedActivity, setSelectedActivity] = useState('')
  // let selectedActivity

  const handleDrawClicked = () => {
    console.log('handling draw clicked')
    sendActivity('draw')
  }
  const handleChessClicked = () => {
    console.log('handling chess clicked')
    // setSelectedActivity('chess')
    sendActivity('chess')
  }
  const handlePuzzleClicked = () => {
    console.log('handling puzzle clicked')
    // setSelectedActivity('puzzle')
    sendActivity('puzzle')
  }

  const handleBookClicked = () => {
    console.log('handling book clicked')
    // setSelectedActivity('book')
    sendActivity('book')
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
