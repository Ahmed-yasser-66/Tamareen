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

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};

export async function getExercise(id) {
  const res = await fetch(
    `${BASE_EXERCISES_API_URL}/exercises/exercise/${id}`,
    exercisesOptions
  );

  if (!res.ok) throw Error(`Couldn't find exercise #${id}`);

  const data = await res.json();
  return data;
}

export async function getYtVideos(name) {
  const res = await fetch(
    `${BASE_YTVIDEOS_API_URL}/search?query=${name} exercise`,
    ytOptions
  );

  if (!res.ok) throw Error(`Couldn't find exercise #${id}`);

  const data = await res.json();
  return data;
}
