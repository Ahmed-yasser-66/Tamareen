const BASE_API_URL = 'https://exercisedb.p.rapidapi.com';

export const exercisesOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RABID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

export async function getExercise(id) {
  const res = await fetch(
    `${BASE_API_URL}/exercises/exercise/${id}`,
    exercisesOptions
  );

  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const data = await res.json();
  return data;
}
