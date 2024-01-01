const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value)
        
        let errorText
        if (isNaN(value) || value <= 0){
           errorText = "Please enter a number greater than 0"
        } else {
           errorText = ""
           setCurrentNOE(value)
        }
      setErrorAlert(errorText)

    }


    return (
        <div id="number-of-events">
          Display <input type="text" defaultValue="32" className="number-input" onChange={handleInputChanged}/> events
        </div>
    )
}

export default NumberOfEvents