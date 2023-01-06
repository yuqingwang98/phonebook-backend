const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3 || process.argv.length == 5) {
  const password = process.argv[2];
  const url = `mongodb+srv://beebo95:${password}@cluster0.n3opwyw.mongodb.net/phonebookApp?retryWrites=true&w=majority`

  if (process.argv.length == 3) {
    mongoose
    .connect(url)
    .then((result) => {
      console.log('connected');
      console.log('Phonebook:')
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    })}
  else {
    const newPerson = process.argv[3]
    const newNumber = process.argv[4]

    mongoose
      .connect(url)
      .then((result) => {
        console.log('connected')

        const person = new Person ({
          name: newPerson,
          number: newNumber,
        })

        return person.save()
      })
      .then(() => {
        console.log('added ' + newPerson + " " + newNumber + " to phonebook")
        return mongoose.connection.close()
      })
      .catch((err) => console.log(err))
  }
}
else {
  console.log('Please format your input like this: node mongo.js yourpassword <Anna 040-1234556>')
  process.exit(1)
}
