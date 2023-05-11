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
  const [stationFilter, setStationFilter] = useState('');

  const { stations } = useLoaderData();

  const handleFilterChange = (e) => {
    setStationFilter(e.target.value);
    setStationPage(0);
  }
  
  const maxStationsPerPage = 40;

  

  let selectedStations = stations;
  if (stationFilter) {
    selectedStations = stations.filter(station => {
      return station.nameFi.toLowerCase().includes(stationFilter)
    })
  } 

  //calculate indeces to show based on stationPage
  let startIndex = stationPage * maxStationsPerPage;
  let stopIndex = Math.min(startIndex + maxStationsPerPage, selectedStations.length);

  let stationsToRender = selectedStations.slice(startIndex, stopIndex);
  let isLastPage = startIndex >= selectedStations.length - maxStationsPerPage;

  
  return (
    <>
      <h1>Bike Stations</h1>
      <label>Filter by name:
        <input 
          type="text" 
          value={stationFilter}
          onChange={handleFilterChange}
        >
        </input>
      </label>
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