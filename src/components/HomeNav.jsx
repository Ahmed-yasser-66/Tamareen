import { NavLink } from 'react-router-dom';
import dumbellIcon from '../assets/dumbbell-solid.svg';

function HomeNav() {
  return (
    <nav className="flex items-center justify-between px-2 py-3 text-dark-gray sm:px-12 sm:py-4 backdrop-blur-sm bg-bright-blue">
      <div className="flex items-center gap-4">
        <img
          src={dumbellIcon}
          className="w-6 h-6 sm:h-8 sm:w-8"
          alt="Dumbbell icon"
        />
        <NavLink
          to="/"
          className="text-2xl font-semibold tracking-widest uppercase sm:text-3xl "
        >
          Tamareen
        </NavLink>
      </div>
      <ul className="flex items-center sm:gap-12">
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `mr-4 text-xl font-medium transition-all duration-150 hover:text-light-gray sm:text-2xl ${
                isActive ? 'text-light-gray' : ''
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/creator"
            className={({ isActive }) =>
              `text-xl font-medium transition-all duration-150 hover:text-light-gray sm:text-2xl ${
                isActive ? 'text-light-gray' : ''
              }`
            }
          >
            Creator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/init"
            className={({ isActive }) =>
              `hidden px-6 py-2 text-xl font-medium rounded-lg sm:text-2xl bg-dark-gray text-light-gray drop-shadow-md md:block ${
                isActive ? 'bg-light-gray text-dark-gray' : ''
              }`
            }
          >
            Train Now
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HomeNav;
