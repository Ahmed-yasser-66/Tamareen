import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import searchIcon from '../assets/search.svg';
import toast from 'react-hot-toast';
import { useExercises } from '../contexts/ExercisesContext';

function SearchBar() {
  const { resetExercises } = useExercises();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) {
      toast.error('Please Enter A Search Query');
      return;
    }

    navigate(`/app/search?query=${searchQuery.toLocaleLowerCase()}`, {
      replace: true,
    });

    resetExercises();

    setSearchQuery('');
  }

  return (
    <form
      className="w-[90%] max-w-[30rem] mx-auto mt-10 flex"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search for any exercise..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 text-xl rounded-lg rounded-r-none text-dark-gray focus:outline-none focus:ring focus:ring-dark-gray"
      />
      <button className=" px-2 py-1 rounded-lg right-1 top-1.5 bg-bright-blue focus:outline-none focus:ring focus:ring-dark-gray rounded-l-none">
        <img src={searchIcon} alt="search icon" className="w-6 h-6" />
      </button>
    </form>
  );
}

export default SearchBar;
