//This will render a list of events that take place in the city the user has selected.

import Event from './Event';

const EventList = ({ events }) => {
    return (
      <ul id="event-list">
        {events ?
       events.map(event => <Event key={event.id} event={event} />) :
       null}
      </ul>
      
    );
  }
  
  export default EventList;