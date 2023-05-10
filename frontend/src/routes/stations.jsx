import { useState, useEffect } from 'react';

import PaginationControls from '../components/PaginationControls';

export default function Stations() {
  const [stations, setStations] = useState([]);
  const [stationPage, setStationPage] = useState(0);

  const maxStationsPerPage = 30;

  useEffect(() => {
    fetch('http://localhost:3000/api/stations')
    .then(stations => stations.json())
    .then(stationList => setStations(stationList));
  }, []);

  //calculate indeces to show based on stationPage
  let startIndex = stationPage * maxStationsPerPage;
  let stopIndex = Math.min(startIndex + maxStationsPerPage, stations.length);

  let stationsToRender = stations.slice(startIndex, stopIndex);
  let isLastPage = startIndex >= stations.length - maxStationsPerPage;

  
  return (
    <>
      <h1>Bike Stations</h1>
        <ul>
          {stationsToRender.map(station=> {
            return (
              <li key={station.stationId}>
                {station.nameFi}
              </li>
            )
          })}
        </ul>
        <PaginationControls 
          page={stationPage}
          setPage={setStationPage}
          isLastPage={isLastPage}
        />
      
    </>
  )
}