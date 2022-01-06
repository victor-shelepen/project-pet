import express, { json } from 'express'
import bodyParser from 'body-parser'
import User from './db/User'
import Measurement from './db/Measurement'
import { decodeToken, encodeToken } from './lib'
import * as fetch from 'node-fetch';

export const xprs = express()
xprs.use(bodyParser.urlencoded({ extended: false }))
xprs.use(bodyParser.json())
xprs.set('view engine', 'pug');
xprs.use(function (req, res, next) {
  req.alerts = []

  res.back = function (data = {}) {
    const _data = {
      alerts: req.alerts,
      ...data
    }

    this.json(_data)
  }

  next()
})

const path = __dirname + '/../../client/dist'
xprs.use('/dist', express.static(path))

// It removes prefix from the development proxy if it exists.
xprs.use(function (req, res, next) {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.substring(4)
  }
  next();
})

xprs.use(async function (req, res, next) {
  if (!req.headers.authorization) {
    next()
    return
  }
  const [, string] = req.headers.authorization.split(' ')
  const { userId } = decodeToken(string)
  const user = await User.findOne({ _id: userId })
  req.user = user
  next()
})

xprs.get('/', async (req, res) => {
  res.send(`Hello World!!!${req?.user?.email}`)
})

function authRoute(type, url, callback) {
  xprs[type](url, async (req, res) => {
    if (!req.user) {
      req.alerts.push({
        severity: 'error',
        message: 'The user should be authenticated.',
      })
      res
        .status(401)
        .back()
      return
    }
    await callback(req, res)
  })
}

function anonymousPostRoute(url, callback) {
  xprs.post(url, async (req, res) => {
    const { recaptcha, secret } = req.body

    if (secret && secret == process.env.secret) {
      // Ok. Pass futher.
    }
    else {
      const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      })
      const { success, ...rest } = await response.json()
      if (!success) {
        req.alerts.push({
          severity: 'error',
          message: 'Invalid verification code.',
        })
        res
          .status(401)
          .back()
        return
      }
    }

    await callback(req, res)
  })
}

authRoute('get', '/users', async (req, res) => {
  const _users = await User.find()
  const users = _users.map(u => u.toObject())
  res
    .json({ users })
})

authRoute('get', '/measurement/list', async (req, res) => {
  const userId = req.user._id
  const measurements = (await Measurement.find({ user: userId }).select('-user')).map(m => m.toObject())
  res
    .back({
      measurements
    })
})

authRoute('get', '/measurement/get/:id', async (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const measurement = (await Measurement
    .findOne({
      user: userId,
      _id: id
    })
    .select('-user'))
    .toObject()
  res
    .back({
      measurement
    })
})

authRoute('get', '/measurement/delete/:id', async (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  await Measurement.findOneAndRemove({ user: userId, _id: id })
  req.alerts.push({
    severity: 'info',
    message: 'the measurement has been deleted succesfully.',
  })
  res.back()
})

authRoute('post', '/measurement/add', async (req, res) => {
  const body = {
    ...(!req.body.user && { user: req.user._id }),
    ...req.body
  }
  let measurement
  if (!body._id) {
    measurement = new Measurement(body)
    req.alerts.push({
      severity: 'success',
      message: 'the measurement has been created succesfully.',
    })
  } else {
    measurement = await Measurement.findById(body._id)
    measurement.overwrite(body)
    req.alerts.push({
      severity: 'success',
      message: 'the measurement has been updated succesfully.',
    })
  }
  await measurement.save()
  req.alerts.push({
    severity: 'info',
    message: 'the measurement has been processed succesfully.',
  })
  res
    .back({
      measurement: measurement.toObject()
    })
})

xprs.post('/register', async (req, res) => {
  const user = new User(req.body)

  // Object validation.
  const validation = user.validateSync()
  if (validation && validation.message) {
    req.alerts.push({
      severity: 'error',
      message: validation.message
    })
    res.back()
    return
  }

  // Check if such email exists.
  const anotherUser = await User.findOne({ email: user.email })
  if (anotherUser) {
    req.alerts.push({
      severity: 'error',
      message: `User with such email ${user.email} exists!`
    })
    res.back()
    return
  }

  // Save new user.
  await user.save()
  req.alerts.push({
    severity: 'success',
    message: 'User has been created successfuly.'
  })
  res.back({
    success: true
  })
})

xprs.post('/validEmail', async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.json({ valid: false })
  } else {
    res.json({ valid: true })
  }
})

anonymousPostRoute('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    req.alerts.push({
      severity: 'error',
      message: 'Such user does not exist.'
    })
    res.back()
    return
  }
  if (user.comparePassword(password)) {
    const token = encodeToken(user._id)
    res.setHeader('Set-Cookie', `token=${token}`);
    req.alerts.push({
      severity: 'success',
      message: `You(${user.email}) have been authenticated successfuly.`
    })
    res.back({
      token
    })
  } else {
    req.alerts.push({
      severity: 'error',
      message: `Passwords are not equal`
    })
    res.back({
      status: false
    })
  }
})

xprs.get('/pug', (req, res) => {
  res.render('index.pug', { title: 'Hey', message: 'Hello there!' });
})
