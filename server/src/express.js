const express = require('express')
export const xprs = express()

xprs.set('view engine', 'pug');

xprs.get('/', (req, res) => {
  res.send('Hello World!!!')
})

xprs.get('/pug', (req, res) => {
  res.render('index.pug', { title: 'Hey', message: 'Hello there!'});
})