import { useExercises } from '../contexts/ExercisesContext';
import CategoryBox from './CategoryBox';

function Categories() {
  const { categories } = useExercises();

  return (
    <div className="my-8">
      <h2 className="text-4xl font-semibold tracking-wider text-center">
        Body Parts
      </h2>
      <div className="flex gap-4 px-4 py-6 mx-auto overflow-x-scroll w-[90%] max-w-[40rem] justify-evenly">
        {categories.map((cat, i) => (
          <CategoryBox key={i} category={cat} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
