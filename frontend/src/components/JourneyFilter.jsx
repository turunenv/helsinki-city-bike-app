export default function JourneyFilter({
  orderBy,
  setOrderBy,
  orderByDesc,
  setOrderByDesc,
  setBatchOffset,
  setPage,
}) {
  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
    setPage(0);
    setBatchOffset(0);
  };

  const handleOrderDescendingChange = (e) => {
    const isDescending = e.target.value === 'order-descending';

    setOrderByDesc(isDescending);
    setPage(0);
    setBatchOffset(0);
  };

  return (
    <div className="journey-filter-container">
      <fieldset id="journey-order-criterion">
        <legend>
          <b>Order By:</b>
        </legend>
        <div>
          <input
            type="radio"
            id="no-order"
            name="no-order"
            value="no-order"
            checked={orderBy === 'no-order'}
            onChange={handleOrderByChange}
          />
          <label htmlFor="no-order">No specific order</label>
        </div>
        <div>
          <input
            type="radio"
            id="departure"
            name="departure"
            value="departure"
            checked={orderBy === 'departure'}
            onChange={handleOrderByChange}
          />
          <label htmlFor="departure">Departure time</label>
        </div>
        <div>
          <input
            type="radio"
            id="dist"
            name="dist"
            value="dist"
            checked={orderBy === 'dist'}
            onChange={handleOrderByChange}
          />
          <label htmlFor="dist">Distance covered</label>
        </div>
        <div>
          <input
            type="radio"
            id="duration"
            name="duration"
            value="duration"
            checked={orderBy === 'duration'}
            onChange={handleOrderByChange}
          />
          <label htmlFor="duration">Journey duration</label>
        </div>
      </fieldset>
      <fieldset id="journey-order-ascending" disabled={orderBy === 'no-order'}>
        <input
          type="radio"
          value="order-ascending"
          id="order-ascending"
          checked={!orderByDesc}
          onChange={handleOrderDescendingChange}
        />
        <label htmlFor="order-ascending">Ascending</label>

        <input
          type="radio"
          value="order-descending"
          id="order-descending"
          checked={orderByDesc}
          onChange={handleOrderDescendingChange}
        />
        <label htmlFor="order-descending">Descending</label>
      </fieldset>
    </div>
  );
}
