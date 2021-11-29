const express = require('express')
export const xprs = express()

xprs.get('/', (req, res) => {
  res.send('Hello World!!!')
})
