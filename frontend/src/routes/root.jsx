import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/stations'}>Stations</Link>
            </li>
            <li>
              <Link to={'/journeys'}>Journeys</Link>  
            </li>
          </ul>
        </nav>
      </header>
        <Outlet />
      <footer></footer>

    </>
  )
}