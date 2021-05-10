import React from 'react'

const NicknameInput = (props) => {
  const { username, setUsername } = props
  return (
    <div>
      <p>Nickname Input</p>
      <input
        placeholder='Nickname'
        type='text'
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
    </div>
  )
}

export default NicknameInput
