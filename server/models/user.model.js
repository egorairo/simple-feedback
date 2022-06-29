const mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    surveys: {type: []},
    defaultSurvey: {type: []},
    givenFeedback: {type: []},
  },
  {collection: 'feedback-users'}
)

const model = mongoose.model('FeedbackUsers', User)

module.exports = model
