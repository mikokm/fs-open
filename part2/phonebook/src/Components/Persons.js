const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person =>
        <div key={person.name}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </div>
      )}
    </>
  )
}

export default Persons
