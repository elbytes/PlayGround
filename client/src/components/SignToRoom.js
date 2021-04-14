import React , { useState, useEffect } from 'react'
import axios from 'axios'
import { login } from '../actions/userActions'
import { useDispatch, useSelector} from 'react-redux'

const SignToRoom = ({setToken}) => {
    //const [name, setName] = useState('')
    // const [room, setRoom] = useState('room')
   const userLogin = useSelector(state => state.userLogin)
   const { userInfo } = userLogin
    async function handleSubmit(e){
        e.preventDefault()
        const result = await axios.post('https://server-6767-dev.twil.io/videoToken', {identity: userInfo.username,})
        setToken(result.data)
        console.log('Got token with value:' + result.data)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <button className="btn btn-success" type="submit">Start Room</button>
        </form>
    )
}

export default SignToRoom
