import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getJourneyBatch } from "../services/journeyService";

export default function Journeys() {
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    getJourneyBatch()
    .then(journeys => setJourneys(journeys));
  }, [])

  return (
    <>
    <h1>Journeys</h1>
    <table>
      <thead>
        <tr>
          <th>Departure station</th>
          <th>Arrival station</th>
          <th>Distance covered (km)</th>
          <th>Duration (min)</th>
        </tr>
      </thead>
      {journeys.map(journey => {
        return (
          <tr key={ journey.journeyId }>
            <td>
              <Link to={`/stations/${journey.departureStation.stationId}`}>
                { journey.departureStation.nameFi }
              </Link>
              </td>
            <td>
              <Link to={`/stations/${journey.arrivalStation.stationId}`}>
                { journey.arrivalStation.nameFi }
              </Link>
            </td>
            <td>{ (journey.travelDist / 1000).toFixed(2) }</td>
            <td>{ Math.round(journey.duration / 60) }</td>
          </tr>
        )
      })}
    </table>
    </>
  )
}