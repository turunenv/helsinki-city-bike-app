import { useLoaderData } from "react-router-dom";
import { getStationById } from '../services/stationService';

export async function loader({ params }) {
  const station = await getStationById(params.stationId);
  return { station };
}

export default function Station() {
  const { station } = useLoaderData();
  return (
    <>
      <h2>{station.nameFi}</h2>
      <p>Address: {station.addressFi}</p>
      <p>Number of journeys starting from {station.nameFi}: <b>{station.asDepartureCount}</b></p>
      <p>Number of journeys ending in {station.nameFi}: <b>{station.asArrivalCount}</b></p>
    </>
  )
}