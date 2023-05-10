async function getJourneyBatch() {
  const journeys = await fetch('http://localhost:3000/api/journeys');
  return journeys.json();
}

export {
  getJourneyBatch,
}