import express from 'express'
import bodyParser from 'body-parser'
import User from './db/User'

export const xprs = express()
xprs.use(bodyParser.urlencoded({ extended: false }))
xprs.use(bodyParser.json())
xprs.set('view engine', 'pug');

xprs.get('/', (req, res) => {
  res.send('Hello World!!!')
})

xprs.post('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.json({
      status: false,
      message: 'Such user does not exist.'
    })
    return
  }
  if (user.password == password) {
    // @TODO set Cookies....
    res.json({
      status: true,
      message: `You(${user.email}) have been authenticated successfuly.`
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