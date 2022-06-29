const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/feedback-letters')

app.post('/api/register', async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10)

    const userEmail = await User.findOne({
      email: req.body.email,
    })

    if (!userEmail) {
      await User.create({
        email: req.body.email,
        password: newPassword,
      })

      return res.json({status: 'ok'})
    } else {
      return res.json({status: 'error', error: 'Duplicate email'})
    }
  } catch (err) {
    res.json({status: 'error', error: 'Duplicate email'})
  }
})

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  })

  if (!user) {
    return res.json({status: 'error', error: 'Invalid login'})
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  )

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.email,
      },
      'secret123'
    )

    return res.json({status: 'ok', user: token})
  } else {
    return res.json({status: 'error', user: false})
  }
})

app.post('/api/surveys', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    await User.updateOne(
      {email: email},
      {$set: {surveys: req.body.surveys}}
    )

    return res.json({status: 'ok'})
  } catch (error) {
    console.log(error)
    res.json({status: 'error', error: 'invalid token'})
  }
})

app.get('/api/surveys', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    const user = await User.findOne({email: email})

    return res.json({status: 'ok', surveys: user.surveys})
  } catch (error) {
    console.log(error)
    return res.json({status: 'error', error: 'invalid token'})
  }
})

app.get('/api/defaultSurvey', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    const user = await User.findOne({email: email})

    return res.json({
      status: 'ok',
      defaultSurvey: user.defaultSurvey,
    })
  } catch (error) {
    console.log(error)
    return res.json({status: 'error', error: 'invalid token'})
  }
})

app.post('/api/defaultSurvey', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    await User.updateOne(
      {email: email},
      {$set: {defaultSurvey: req.body.defaultSurvey}}
    )

    return res.json({status: 'ok'})
  } catch (error) {
    console.log(error)
    return res.json({status: 'error', error: 'invalid token'})
  }
})

app.get('/api/giveFeedback', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    const user = await User.findOne({email: email})

    return res.json({
      status: 'ok',
      givenFeedback: user.givenFeedback,
    })
  } catch (error) {
    console.log(error)
    return res.json({status: 'error', error: 'invalid token'})
  }
})

app.post('/api/giveFeedback', async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    await User.updateOne(
      {email: email},
      {$set: {givenFeedback: req.body.givenFeedback}}
    )

    return res.json({status: 'ok'})
  } catch (error) {
    console.log(error)
    return res.json({status: 'error', error: 'invalid token'})
  }
})

app.listen(1337, () => {
  console.log('Server started on 1337')
})
