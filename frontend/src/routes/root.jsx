import { Outlet, Link } from 'react-router-dom';
import '../styles/root.css';

export default function Root() {
  return (
    <>
      <header className='main-header'>
        <nav className='main-nav'>
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