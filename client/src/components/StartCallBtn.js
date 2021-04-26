import React from 'react'

const StartCallBtn = ({ handleStartCallBtnSubmit }) => {
  return (
    <div>
      <button onClick={handleStartCallBtnSubmit}>Start Call</button>
    </div>
  )
}

export default StartCallBtn
