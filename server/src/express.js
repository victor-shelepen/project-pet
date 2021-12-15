import express from 'express'
import bodyParser from 'body-parser'
import User from './db/User'
import { decodeToken, encodeToken } from './lib'

export const xprs = express()
xprs.use(bodyParser.urlencoded({ extended: false }))
xprs.use(bodyParser.json())
xprs.set('view engine', 'pug');

xprs.use(async function (req, res, next) {
  if (!req.headers.authorization) {
    next()
  }
  const [, string ] = req.headers.authorization.split(' ')
  const { userId } = decodeToken(string)
  const user = await User.findOne({_id: userId})
  req.user = user
  next();
});

xprs.get('/', async (req, res) => {
  res.send(`Hello World!!!${req?.user?.email}`)
})

xprs.get('/users', async (req, res) => {
  if (!req.user) {
    res
      .status(401)
      .json({
        status: false,
        message: 'The user should be authenticated.'
      })
    return
  }

  const _users = await User.find()
  const users = _users.map(u => u.toObject())
  res
    .json({users})
})

xprs.post('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    res.json({
      status: false,
      message: 'Such user does not exist.'
    })
    return
  }
  if (user.comparePassword(password)) {
    const token = encodeToken(user._id)
    res.setHeader('Set-Cookie', `token=${token}`);
    res.json({
      status: true,
      message: `You(${user.email}) have been authenticated successfuly.`,
      token
    })
  } else {
    res.json({
      status: false,
      message: 'Passwords are not equal.'
    })
  }
})

xprs.get('/pug', (req, res) => {
  res.render('index.pug', { title: 'Hey', message: 'Hello there!'});
})