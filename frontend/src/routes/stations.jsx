import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import {  getAllStations } from '../services/stationService';

import PaginationControls from '../components/PaginationControls';

//data loader function
export async function loader() {
  const stations = await getAllStations();
  return { stations };
}

export default function Stations() {
  const [stationPage, setStationPage] = useState(0);

  const { stations } = useLoaderData();
  
  const maxStationsPerPage = 40;

  //calculate indeces to show based on stationPage
  let startIndex = stationPage * maxStationsPerPage;
  let stopIndex = Math.min(startIndex + maxStationsPerPage, stations.length);

  let stationsToRender = stations.slice(startIndex, stopIndex);
  let isLastPage = startIndex >= stations.length - maxStationsPerPage;

  
  return (
    <>
      <h1>Bike Stations</h1>
        <div className="data-container">
          <ul>
            {stationsToRender.map(station=> {
              return (
                <li key={station.stationId}>
                  <Link to={`/stations/${station.stationId}`}>
                    {station.nameFi}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <PaginationControls 
          page={stationPage}
          setPage={setStationPage}
          isLastPage={isLastPage}
        />
    </>
  )
}