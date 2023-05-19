import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured.</p>
      <p id="error-status">{error.statusText || error.message}</p>
      <Link to={'/'}>Return to the home page</Link>
    </div>
  );
}
