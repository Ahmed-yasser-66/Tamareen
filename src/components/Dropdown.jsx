import { useState } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import arrowUp from '../assets/arrow-up.svg';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { editUserData } = useUser();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleUpdate() {
    console.log('update');
    editUserData();
  }

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        type="button"
        onClick={toggleDropdown}
        className="focus:outline-none focus:ring focus:ring-bright-blue"
      >
        <img
          src={arrowDown}
          className={`h-4 sm:h-6 ${isOpen ? 'rotate-180' : ''} transition-all duration-300`}
          alt="arow down for openning the dropped menu"
        />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-10 mt-4 bg-white divide-y rounded-lg shadow w-44 "
        >
          <ul
            className="divide-y-2 rounded-lg text-md text-dark-gray divide-medium-gray sm:text-lg"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                to="/plan"
                className="block px-4 py-3 rounded-lg hover:bg-light-gray "
              >
                My Plan
              </Link>
            </li>

            <li>
              <Link
                to="/saved-exercises"
                className="block px-4 py-3 rounded-lg hover:bg-light-gray"
              >
                Saved Exercises
              </Link>
            </li>

            <li
              className="block px-4 py-3 rounded-lg cursor-pointer hover:bg-light-gray "
              onClick={handleUpdate}
            >
              Update Profile
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
