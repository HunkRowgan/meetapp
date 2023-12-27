import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import './App.css';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
 return (
   <div className="App">
     <NumberOfEvents />
     <CitySearch />
     <EventList />
   </div>
 );
}

export default App;
