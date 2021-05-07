
const ShowPersons = ({ persons, filter, removePerson }) => {
  return (
    <div>
      <ul>
        {persons.map(person => {
          if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return <p key={person.id}>
              {person.name} {person.number}
              <button type="button" onClick={removePerson} value={person.id}>delete</button>
            </p>
          } return <></>
        })}
      </ul>
    </div>
  )
}

export default ShowPersons
