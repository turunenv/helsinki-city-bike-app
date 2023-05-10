export default function PaginationControls({page, setPage, isLastPage}) {
  return (
    <>
      {page !== 0 && (
        <button onClick={() => setPage(page - 1)}>
          Previous
        </button>
      )}
      {!isLastPage && (
        <button onClick={() => setPage(page +1)}>
          Next
        </button>
      )}
    </>
  )
}