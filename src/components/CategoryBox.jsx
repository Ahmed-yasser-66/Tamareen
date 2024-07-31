import muscle from '../assets/muscle.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useExercises } from '../contexts/ExercisesContext';

function CategoryBox({ category }) {
  const { resetExercises } = useExercises();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get('category');
  const isSelected = selectedCategory === category;

  function handleClick() {
    navigate(`/app/category?category=${category}`, { replace: true });
    resetExercises();
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-36 sm:h-40 gap-4 px-4 py-4 rounded-lg cursor-pointer min-w-36 bg-bright-blue ${isSelected ? 'border-4 border-white' : ''} `}
      onClick={handleClick}
    >
      <img src={muscle} className="w-16 h-16" />
      <h3 className="text-2xl font-semibold text-center">{category}</h3>
    </div>
  );
}

export default CategoryBox;
