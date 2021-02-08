import React, { useEffect, useState } from 'react'
import Filter from './Filter'
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

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      PersonService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const filteredPersons = () => {
    return persons.filter(person => person.name.toUpperCase().includes(filterText.toUpperCase()))
  }

  const deletePerson = (id) => {
    PersonService.delete(id)
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <>
      <h2>Phonebook</h2>
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
