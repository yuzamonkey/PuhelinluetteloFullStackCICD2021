const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name:
            <input value={newName} onChange={handleNameChange} /> <br></br>
            number:
            <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form