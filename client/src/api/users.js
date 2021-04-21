import axios from 'axios'

const url = 'http://localhost:5000/api/users/search'

export const findUser = () => axios.get(url)
