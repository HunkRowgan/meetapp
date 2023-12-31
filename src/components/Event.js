
import { useState } from "react"
import { getEvents } from "../api"
import mockData from "../mock-data"

const Event = ({event}) => {
    const [showDetails, setshowDetails] = useState(false)


   return (
   <li id='list-item'>
      <h2>{event.summary}</h2>
      <p>{event.location}</p>

      <button className="details-btn" onClick={() => {
         setshowDetails(!showDetails)
      }}>{showDetails ? 'Hide details' : 'Show details'}</button>



      {showDetails ? (
         <div id="details">
           <p>When: {event.start.dateTime}<span>({event.start.timeZone})</span></p>
           <p>{event.description}</p>
         </div>
      ): null}


   </li>
   )
}

export default Event