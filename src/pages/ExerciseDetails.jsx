import { useLoaderData } from 'react-router-dom';
import { getExercise } from '../utils/fetchData';

function ExerciseDetails() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1>here is the exercise details 😁</h1>
    </div>
  );
}

export async function loader({ params }) {
  const data = await getExercise(params.Id);

  return data;
}

export default ExerciseDetails;
