const Persons = ({ persons, deletePerson }) => {
  const confirmDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
    }
  }

  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => confirmDelete(person.id, person.name)}>delete</button>
        </div>
      )}
    </>
  )
}

export default Persons
