import { createContext, useContext, useEffect, useReducer } from 'react';
import { exercisesOptions, fetchData } from '../utils/fetchData';

const BASE_API_URL = 'https://exercisedb.p.rapidapi.com';

const ExercisesContext = createContext();

const initialState = {
  exercises: [],
  isLoading: false,
  limit: 6,
  offset: 0,
  currentPage: 1,
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
  searchContext: 'all', //all - name - category
  searchQuery: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'exercises/loaded':
      return {
        ...state,
        isLoading: false,
        exercises: action.payload,
      };

    case 'category/changed':
      return {
        ...state,
        selectedCategory: action.payload,
        searchContext: 'category',
        offset: 0,
        currentPage: 1,
      };

    case 'name/searched':
      return {
        ...state,
        searchQuery: action.payload,
        searchContext: 'name',
        selectedCategory: '',
        offset: 0,
        currentPage: 1,
      };

    case 'page/changed':
      return {
        ...state,
        currentPage: action.payload,
        offset: (action.payload - 1) * state.limit,
      };

    case 'exercises/reset':
      return {
        ...state,
        offset: 0,
        searchContext: 'all',
      };

    default:
      return state;
  }
}

function ExercisesProvider({ children }) {
  const [
    {
      exercises,
      isLoading,
      offset,
      limit,
      categories,
      selectedCategory,
      searchContext,
      searchQuery,
      currentPage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchAllExercisesData() {
        dispatch({ type: 'loading' });

        let url;
        switch (searchContext) {
          case 'name':
            url = `${BASE_API_URL}/exercises/name/${searchQuery}?offset=${offset}&limit=${limit}`;
            break;
          case 'category':
            url = `${BASE_API_URL}/exercises/bodyPart/${selectedCategory}?offset=${offset}&limit=${limit}`;
            break;
          case 'all':
          default:
            url = `${BASE_API_URL}/exercises?offset=${offset}&limit=${limit}`;
            break;
        }

        try {
          const data = await fetchData(url, exercisesOptions);

          dispatch({ type: 'exercises/loaded', payload: data });
        } catch (err) {
          console.log(err);
        }
      }

      fetchAllExercisesData();
    },
    [limit, offset, searchContext, searchQuery, selectedCategory]
  );

  async function getExercisesByName(name) {
    dispatch({ type: 'name/searched', payload: name });
  }

  async function getExercisesByCategory(category) {
    dispatch({ type: 'category/changed', payload: category });
  }

  async function paginate(page) {
    dispatch({ type: 'page/changed', payload: page });
  }

  async function backToAll() {
    dispatch({ type: 'exercises/reset' });
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
        paginate,
        currentPage,
        limit,
        offset,
        backToAll,
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
