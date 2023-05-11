import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PaginationControls from '../components/PaginationControls';
import JourneyFilter from '../components/JourneyFilter';

import { getJourneyBatch } from "../services/journeyService";

export default function Journeys() {
  const [journeys, setJourneys] = useState([]);
  const [page, setPage] = useState(0);
  const [batchOffset, setBatchOffset] = useState(0);
  const [orderBy, setOrderBy] = useState('no-order');
  const [orderByDesc, setOrderByDesc] = useState(false);

  const maxJourneysPerPage = 25;

  useEffect(() => {
    console.log('useEffect FIRED')
    getJourneyBatch(batchOffset, orderBy, orderByDesc)
    .then(newJourneys => setJourneys(newJourneys));
  }, [batchOffset, orderBy, orderByDesc])

  let startIndex = page * maxJourneysPerPage;
  let stopIndex = Math.min(startIndex + maxJourneysPerPage, journeys.length);
  let isLastPage = startIndex >= journeys.length - maxJourneysPerPage;

  const journeysToRender = journeys.slice(startIndex, stopIndex);

  const fetchNewJourneyBatch = (offsetAdjustment) => {
    setBatchOffset(batchOffset + offsetAdjustment);

    let newPage;
    if (offsetAdjustment > 0) {
      newPage = 0;
    } else {
      newPage = journeys.length / maxJourneysPerPage - 1;
    }

    setPage(newPage);
  }

  return (
    <>
    <h1>Journeys</h1>
    <JourneyFilter 
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderByDesc={orderByDesc}
      setOrderByDesc={setOrderByDesc}
      setBatchOffset={setBatchOffset}
      setPage={setPage}
    />
    <div className='data-container'>
      <table>
        <thead>
          <tr>
            <th>Departure station</th>
            <th>Arrival station</th>
            <th>Distance covered (km)</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
        {journeysToRender.map(journey => {
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
              <td>{ (journey.duration / 60).toFixed(1) }</td>
            </tr>
          )
        })}
        </tbody>
      </table>
      {(page === 0 && batchOffset !== 0) && (
        <button onClick={() => fetchNewJourneyBatch(-1)}>
          Previous
        </button>
      )}
      <PaginationControls 
        page={page}
        setPage={setPage}
        isLastPage={isLastPage}
      />
      {isLastPage && (
        <button onClick={() => fetchNewJourneyBatch(1)}>
          Next
        </button>
      )}
    </div>
    </>
  )
}