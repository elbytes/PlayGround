import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Aryssa',
        email: 'aryssa@playground.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Opa',
        email: 'opa@playground.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Mema',
        email: 'mema@playground.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Sohrab',
        email: 'sohrab@playground.com',
        password: bcrypt.hashSync('12345', 10),
    }
]


export default users