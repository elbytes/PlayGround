import bodyParser from 'body-parser'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import generateUniqueId from '../utils/generateUniqueId.js'

//@desc AUTH user and get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password. Please try again.')
  }
})

//@desc Get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({ id: user._id, name: user.name, email: user.email })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Get user
//@route POST /api/users/search
//@access private
const findUser = asyncHandler(async (req, res) => {
  const username = req.body.username
  console.log(req.body.username)
  console.log('Searching the database')
  const user = await User.findOne({ username })
  if (user) {
    res.json({ username: user.username })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    ;(user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email)

    if (req.body.password) {
      user.password = req.body.password
    }

    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found. Please try again')
  }
})

//@desc Register user
//@route GET /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body
  const code = generateUniqueId()

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exisrs. Please login instead.')
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
    code,
  })

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
      code: user.code,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user')
  }
})

//@desc Get user home
//@route GET /api/users/home
//@access private
const getUserHome = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      userCode: user.userCode,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUserHome,
  findUser,
}
