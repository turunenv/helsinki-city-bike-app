async function getAllStations() {
  const stations = await fetch("http://localhost:3000/api/stations");
  return stations.json();
}

async function getStationById(id) {
  const station = await fetch(`http://localhost:3000/api/stations/${id}`);

  if (station.status === 400) {
    throw new Error(`${id} is not a valid station id!`);
  } else if (station.status === 404) {
    return ({ status: 404 });
  }
  return station.json();
}

export { getAllStations, getStationById };
