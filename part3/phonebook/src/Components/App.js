import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import Notification from './Notification'
import PersonForm from './PersonForm'
import Persons from './Persons'
import PersonService from './../Services/PersonService'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    PersonService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const [filterText, setFilterText] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  const showNotification = (text) => {
    setNotification(text)
    setTimeout(() => setNotification(null), 2000)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const oldPerson = persons.find(person => person.name === newName)
    const newPerson = { name: newName, number: newNumber }

    if (oldPerson) {
      const message = `${newName} is already added to phonebook?, replace the old number with a new one?`
      if (window.confirm(message)) {
        PersonService
          .update(oldPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.name !== newName ? person : response.data))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${newName}`)
          })
      }
    } else {
      PersonService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`)
        })
    }
  }

  const filteredPersons = () => {
    return persons.filter(person => person.name.toUpperCase().includes(filterText.toUpperCase()))
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      PersonService.delete(id)
      setPersons(persons.filter(person => person.id !== id))
      showNotification(`Deleted ${name}`)
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons persons={filteredPersons()} deletePerson={deletePerson} />
    </>
  )
}

export default App
