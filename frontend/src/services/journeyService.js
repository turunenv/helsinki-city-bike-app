async function getJourneyBatch(offset, orderBy, desc) {
  let reqUrl = `http://localhost:3000/api/journeys?offset=${offset}`;

  if (orderBy) {
    reqUrl += `&orderby=${orderBy}`;

    if (desc) {
      reqUrl += `&desc=true`;
    }
  }

  const journeys = await fetch(reqUrl);
  return journeys.json();
}

export {
  getJourneyBatch,
}