const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user:${password}@cluster0.a0lgn.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

// Define the schema for a person and the matching model
// Schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// Model
const Person = mongoose.model('person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons => {
            console.log('phonebook:')
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(result)
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Please provide the required arguments')
    process.exit(1)
}