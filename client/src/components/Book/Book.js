import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Button } from 'react-bootstrap'
import { bookNameList } from './bookData/bookNameList'
import { peterRabbitBookContent } from './bookData/peterRabbitBookContent'
import { peterRabbitImages } from './bookData/peterRabbitImages'
import TheEnd from './TheEnd'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import { emitNextClicked, emitPrevClicked } from '../../utils/wsConn/wsConn'
const styles = {
  title: { fontSize: '2.5rem', textAlign: 'center' },
  img: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  paragraph: { fontSize: '1.5rem' },
  prevBtns: { marginTop: '20%', marginRight: '10%' },
  nextBtns: { marginTop: '20%', marginLeft: '5%' },
}
const Book = (props) => {
  let id = props.id
  const [pageNumber, setPageNumber] = useState(0)
  const [pageParagraph, setPageParagraph] = useState(
    'Once upon a time there were four little Rabbits, and their names were— Flopsy,  Mopsy,  Cotton-tail,  and Peter. They lived with their Mother in a sand-bank, underneath the root of a very big fir-tree.'
  )

  let paragraph
  peterRabbitBookContent.forEach(() => {
    paragraph = peterRabbitBookContent.find((p) => {
      return p.id === pageNumber
    })
  })

  let image
  peterRabbitImages.forEach(() => {
    image = peterRabbitImages.find((image) => {
      return image.id === pageNumber
    })
  })

  let nextClickedDataToSend = {
    socket: connectedUserSocketId,
    next: pageNumber,
  }

  useEffect(() => {
    setPageParagraph(paragraph)
  }, [pageNumber])

  const onNextClicked = () => {
    setPageNumber(pageNumber + 1)
    emitNextClicked(nextClickedDataToSend)
    console.log('sending next cliked data to server')
  }
  const onPrevClicked = () => {
    setPageNumber(pageNumber - 1)
  }
  return (
    <>
      {peterRabbitBookContent.length - 1 === pageNumber ? (
        <div>
          <TheEnd />
          <Button>back to library</Button>
        </div>
      ) : (
        <div>
          <Row>
            {/* <Col style={styles.title}>{bookNameList[id].name}</Col> */}
          </Row>
          <Row>
            <Col style={styles.img}>
              <Image src={image.src} />
            </Col>
          </Row>
          <Row>
            <Col lg={2} style={styles.prevBtns}>
              <Button onClick={onPrevClicked}>PREV</Button>
            </Col>
            <Col lg={6}>
              <p style={styles.paragraph}>{paragraph.p}</p>
            </Col>
            <Col lg={2} style={styles.nextBtns}>
              <Button onClick={onNextClicked}>NEXT</Button>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default Book
