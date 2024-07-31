const BASE_EXERCISES_API_URL = 'https://exercisedb.p.rapidapi.com';
const BASE_YTVIDEOS_API_URL =
  'https://youtube-search-and-download.p.rapidapi.com';

export const exercisesOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RABID_EXERCISES_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

const ytOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': process.env.RABID_YT_API_KEY,
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
  },
};

export async function getAllExercises(offset, limit) {
  const res = await fetch(
    `${BASE_EXERCISES_API_URL}/exercises?limit=${limit}&offset=${offset}`,
    exercisesOptions
  );

  if (!res.ok) throw Error(`Couldn't Load exercises`);

  const data = await res.json();

  return data;
}

export async function getExercisesByCategory(categoryName, offset, limit) {
  const res = await fetch(
    `${BASE_EXERCISES_API_URL}/exercises/bodyPart/${categoryName}?offset=${offset}&limit=${limit}`,
    exercisesOptions
  );

  if (!res.ok) throw Error(`Couldn't Load Exercises`);

  const data = await res.json();

  return data;
}

export async function getExercisesByName(name, offset, limit) {
  const res = await fetch(
    `${BASE_EXERCISES_API_URL}/exercises/name/${name}?offset=${offset}&limit=${limit}`,
    exercisesOptions
  );

  if (!res.ok) throw Error(`Couldn't Load Exercises`);

  const data = await res.json();

  return data;
}

export async function getExercise(id) {
  const res = await fetch(
    `${BASE_EXERCISES_API_URL}/exercises/exercise/${id}`,
    exercisesOptions
  );

  if (!res.ok) throw Error(`Couldn't load this exercise`);

  const data = await res.json();
  return data;
}

export async function getSavedExercises(savedExercises) {
  const fetchPromises = savedExercises.map((id) =>
    fetch(
      `${BASE_EXERCISES_API_URL}/exercises/exercise/${id}`,
      exercisesOptions
    )
  );

  const responses = await Promise.all(fetchPromises);
  const exericses = await Promise.all(
    responses.map((res) => {
      if (!res.ok) throw new Error('Could not load saved exercises');
      return res.json();
    })
  );

  return exericses;
}

export async function getYtVideos(name) {
  const res = await fetch(
    `${BASE_YTVIDEOS_API_URL}/search?query=${name} exercise`,
    ytOptions
  );

  if (!res.ok) throw Error(`Couldn't find exercise videos`);

  const data = await res.json();
  return data;
}
