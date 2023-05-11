async function getJourneyBatch(offset, orderBy, desc) {
  let reqUrl = `http://localhost:3000/api/journeys?offset=${offset}`;

  if (orderBy) {
    reqUrl += `&orderby=${orderBy}`;

    if (desc) {
      reqUrl += `&desc=true`;
    }
  }

  console.log(`req url is ${reqUrl}`);

  const journeys = await fetch(reqUrl);
  return journeys.json();
}

export {
  getJourneyBatch,
}