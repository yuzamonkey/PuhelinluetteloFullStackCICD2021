import React, { useState, useEffect } from 'react'
import Title from './components/Title'
import ShowPersons from './components/ShowPersons'
import Filter from './components/Filter'
import Form from './components/Form'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        const updateperson = persons.find(person => person.name === newName)
        const personObject = {
          name: updateperson.name,
          number: newNumber
        }
        personService
          .update(updateperson.id, personObject)
          .then(response => { // eslint-disable-line
            const newPersons = persons.map(person => (updateperson.id) === (person.id) ? personObject : person)
            setPersons(newPersons)
            setSuccessMessage(
              `Number changed for ${newName}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => { // eslint-disable-line
            const newPersons = persons.filter(person => person.name !== newName)
            setPersons(newPersons)
            setErrorMessage(`Information of ${newName} has already removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        setNewName('')
        setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `${newName} added`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (event) => {
    event.preventDefault()
    const id = event.target.value
    const person = persons.find(p => Number(p.id) === Number(id))
    const returnvalue = window.confirm(`Delete ${person.name}`)
    if (returnvalue) {
      personService
        .remove(id)
        .then(response => { // eslint-disable-line
          const newPersons = persons.filter(person => Number(person.id) !== Number(id))
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Title text="Phonebook (for part 11 CI/CD)" />
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange} />
      <Title text="add new person" />
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <Title text="Numbers" />
      <ShowPersons persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App
