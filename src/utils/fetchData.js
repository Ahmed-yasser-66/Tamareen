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
