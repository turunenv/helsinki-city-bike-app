import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getAllStations } from '../services/stationService';

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
  };

  const maxStationsPerPage = 30;

  let selectedStations = stations;
  if (stationFilter) {
    selectedStations = stations.filter((station) => {
      return station.nameFi.toLowerCase().includes(stationFilter.toLowerCase());
    });
  }

  //calculate indeces to show based on stationPage
  let startIndex = stationPage * maxStationsPerPage;
  let stopIndex = Math.min(
    startIndex + maxStationsPerPage,
    selectedStations.length
  );

  let stationsToRender = selectedStations.slice(startIndex, stopIndex);
  let isLastPage = startIndex >= selectedStations.length - maxStationsPerPage;

  return (
    <>
      <h1>Bike Stations</h1>
      <div className="station-filter">
        <label htmlFor="station-filter-input">
          <b>Filter by name:</b>
        </label>
        <input
          type="text"
          value={stationFilter}
          onChange={handleFilterChange}
          id="station-filter-input"
        ></input>
      </div>
      <div className="data-container">
        <table>
          <tbody>
            {stationsToRender.map((station) => {
              return (
                <tr key={station.stationId}>
                  <td>
                    <Link to={`/stations/${station.stationId}`}>
                      {station.nameFi}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PaginationControls
        page={stationPage}
        setPage={setStationPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
