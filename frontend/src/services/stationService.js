async function getAllStations() {
  const stations = await fetch("http://localhost:3000/api/stations");
  return stations.json();
}

async function getStationById(id) {
  const station = await fetch(`http://localhost:3000/api/stations/${id}`);

  if (station.status === 400) {
    throw new Error(`station with id ${id} does not exist!`);
  }
  return station.json();
}

export { getAllStations, getStationById };
