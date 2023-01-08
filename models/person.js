const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(
    console.log('connected to MongoDB')
  )
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === '-' || number[3] === '-') && number.length < 9) {
        if (!/^\d{2,3}-\d+$/.test(number)) {
          return false}
      }
      else if (!/^\d+$/.test(number)) {
        return false
      }
      return true
    },
    msg: 'invalid phone number',
  }
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: numberValidators
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
