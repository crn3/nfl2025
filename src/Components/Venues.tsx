import axios from "axios";
import { useEffect, useState } from "react";

function Venues(){
    interface Venue{
        venueID:string;
        venueName:string;
        venueCity:string;
        venueState:string;
        venueCountry:string;
        indoor:string
    }

    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
        const getVenues = async () => {
            const response = await axios.get<Venue[]>("http://localhost:3000/venues");
            const alphabetical = [...response.data].sort((a,b) =>
            a.venueName.localeCompare(b.venueName));
            setVenues(alphabetical);
        };
        getVenues();
    },[]);

    
    return (
        <>
      <h1>Venues</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venues)=> (
            <tr key={venues.venueID}>
            <td>{venues.venueName}</td>
            <td>{venues.venueCity}</td>
            <td>{venues.venueState}</td>
            <td>{venues.venueCountry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

    );
}
export default Venues;