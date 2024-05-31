import { createContext, useContext, useEffect, useReducer } from 'react';
import { exercisesOptions, fetchData } from '../utils/fetchData';

const BASE_API_URL = 'https://exercisedb.p.rapidapi.com';

const ExercisesContext = createContext();

const initialState = {
  exercises: [],
  isLoading: false,
  limit: 6,
  offset: 0,
  categories: [
    'back',
    'cardio',
    'chest',
    'lower arms',
    'lower legs',
    'neck',
    'shoulders',
    'upper arms',
    'upper legs',
    'waist',
  ],
  selectedCategory: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'exercises/loaded':
      return { ...state, isLoading: false, exercises: action.payload };

    case 'category/changed':
      return { ...state, selectedCategory: action.payload };

    default:
      return state;
  }
}

function ExercisesProvider({ children }) {
  const [
    { exercises, isLoading, offset, limit, categories, selectedCategory },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchAllExercisesData() {
        dispatch({ type: 'loading' });

        try {
          const data = await fetchData(
            `${BASE_API_URL}/exercises?offset=${offset}&limit=${limit}`,
            exercisesOptions
          );

          dispatch({ type: 'exercises/loaded', payload: data });
        } catch (err) {
          console.log(err);
        }
      }

      fetchAllExercisesData();
    },
    [limit, offset]
  );

  async function getExercisesByName(name) {
    dispatch({ type: 'loading' });

    try {
      const data = await fetchData(
        `${BASE_API_URL}/exercises/name/${name}?offset=${offset}&limit=${limit}`,
        exercisesOptions
      );
      dispatch({ type: 'exercises/loaded', payload: data });
    } catch (err) {
      console.log(err);
    }
  }

  async function getExercisesByCategory(category) {
    dispatch({ type: 'loading' });

    try {
      const data = await fetchData(
        `${BASE_API_URL}/exercises/bodyPart/${category}?offset=${offset}&limit=${limit}`,
        exercisesOptions
      );
      dispatch({ type: 'exercises/loaded', payload: data });
      dispatch({ type: 'category/changed', payload: category });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        isLoading,
        getExercisesByName,
        categories,
        getExercisesByCategory,
        selectedCategory,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
}

function useExercises() {
  const context = useContext(ExercisesContext);
  if (context === undefined) throw new Error('context out of the provider');
  return context;
}

export { ExercisesProvider, useExercises };
