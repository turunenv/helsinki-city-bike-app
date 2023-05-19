import { useLoaderData } from "react-router-dom";
import { getStationById } from '../services/stationService';

import { Navigate } from "react-router-dom";

export async function loader({ params }) {
  const station = await getStationById(params.stationId);
  return { station };
}

export default function Station() {
  const { station } = useLoaderData();
  const notFound = station?.status === 404;

  return (
    <>
      { 
        notFound 
          ? <Navigate to='/not-found'/>
       : (
          <>
            <h2>{station.nameFi}</h2>
            <p>Address: {station.addressFi}</p>
            <p>Number of journeys starting from {station.nameFi}: <b>{station.asDepartureCount}</b></p>
            <p>Number of journeys ending in {station.nameFi}: <b>{station.asArrivalCount}</b></p>
          </>
        )
      }
    </>
  )
}