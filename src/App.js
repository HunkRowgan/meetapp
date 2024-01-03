//This is where both CitySearch and EventList will be rendered. This component will receive a click event from CitySearch when the user selects a new city. The events state will be updated in the App component and then passes the new list to EventList.


import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {

  const [events, setEvents] = useState([]); // create two new states: events and currentNOE
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]); // create allLocations state
  const [currentCity, setCurrentCity] = useState("See all cities"); //create currentCity state
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('')
    } else {
      setWarningAlert('You are currently using the app offline - for up to date info please go online')
    }
    fetchData(); // call fetchData in useEffect
  }, [currentCity, currentNOE]); //useEffect called whenever dependency currentCity, currentNOE changes

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents)); //initialize the allLocations state in the fetchData() function
  }


 return (
   <div className="App">
    <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}    {/* this is a comment in jsx*/}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
    <CitySearch
     allLocations={allLocations}
     setCurrentCity={setCurrentCity} //pass allLocations state as prop to CitySearch component
     setInfoAlert={setInfoAlert}
     />
     <NumberOfEvents
     setCurrentNOE={setCurrentNOE}
     setErrorAlert={setErrorAlert}
     />
     <CityEventsChart
     allLocations={allLocations}
     events={events}
    />
     <EventList
     events={events} //pass events state as prop to EventList
     /> 
   </div>
 );
}

export default App;
