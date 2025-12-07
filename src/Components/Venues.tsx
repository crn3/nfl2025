import axios from "axios";
import { useEffect, useState } from "react";

function Venues() {
  interface Venue {
    venueId: string;
    venueName: string;
    venueCity: string;
    venueState: string;
    venueCountry: string;
    indoor: string;
  }

  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    axios
      .get<Venue[]>("http://localhost:3000/venues")
      .then((response) => {
        const alphabetical = [...response.data].sort((a, b) =>
          a.venueName.localeCompare(b.venueName)
        );
        setVenues(alphabetical);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          {venues.map((venue) => (
            <tr key={venue.venueId}>
              <td>{venue.venueName}</td>
              <td>{venue.venueCity}</td>
              <td>{venue.venueState}</td>
              <td>{venue.venueCountry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Venues;
