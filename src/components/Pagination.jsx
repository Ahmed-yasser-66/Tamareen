import { Link, useSearchParams } from 'react-router-dom';
import { useExercises } from '../contexts/ExercisesContext';

function Pagination({ exercisesCount }) {
  const { paginate, currentPage, limit } = useExercises();
  const [searchParams] = useSearchParams();

  function handlePrev() {
    paginate(currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNext() {
    paginate(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <div className="flex gap-5 my-8">
        <Link to={{ search: searchParams.toString() }}>
          <button
            className="flex items-center gap-1 px-2 py-1 text-xl font-semibold transition-all duration-75 rounded-lg bg-bright-blue hover:bg-light-blue disabled:bg-medium-gray disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
        </Link>

        <Link to={{ search: searchParams.toString() }}>
          <button
            className="flex items-center gap-1 px-2 py-1 text-xl font-semibold transition-all duration-75 rounded-lg bg-bright-blue hover:bg-light-blue disabled:bg-medium-gray disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={exercisesCount < limit}
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Pagination;
