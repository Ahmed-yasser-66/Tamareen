import { useState } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import arrowUp from '../assets/arrow-up.svg';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        type="button"
        onClick={toggleDropdown}
        className="focus:outline-none focus:ring focus:ring-bright-blue"
      >
        {isOpen ? (
          <img
            src={arrowUp}
            className="h-4 sm:h-6"
            alt="arow up for closing the dropped menu"
          />
        ) : (
          <img
            src={arrowDown}
            className="h-4 sm:h-6"
            alt="arow down for openning the dropped menu"
          />
        )}
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-10 mt-2 bg-white divide-y rounded-lg shadow w-44 "
        >
          <ul
            className="py-2 divide-y-2 text-md text-dark-gray divide-medium-gray sm:text-lg "
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link className="block px-4 py-2 ">Saved Exercises</Link>
            </li>
            <li>
              <Link className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Update Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
