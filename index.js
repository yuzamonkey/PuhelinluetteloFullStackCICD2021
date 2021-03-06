const express = require('express')
const app = express()
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())

let persons = [
	{
		'name': 'Arto Hellas',
		'number': '040-123456',
		'id': 1
	},
	{
		'name': 'Ada Lovelace',
		'number': '39-44-5323523',
		'id': 2
	},
	{
		'name': 'Dan Abramov',
		'number': '12-43-234345',
		'id': 3
	},
	{
		'name': 'Mary Poppendieck',
		'number': '39-23-6423122',
		'id': 4
	},
]
  
app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/health', (req, res) => {
	res.send('ok')
})

app.get('/version', (req, res) => {
	res.json('1.3')
})

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)