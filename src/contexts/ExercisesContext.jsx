import { createContext, useContext, useReducer, useEffect } from 'react';

const ExercisesContext = createContext();

const initialState = {
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
  savedExercises: JSON.parse(localStorage.getItem('savedExercises')) || [],
};

function reducer(state, action) {
  switch (action.type) {
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
        currentPage: 1,
      };

    case 'savedExercises/added':
      return {
        ...state,
        savedExercises: [...state.savedExercises, action.payload],
      };

    case 'savedExercises/removed':
      return {
        ...state,
        savedExercises: state.savedExercises.filter(
          (id) => id !== action.payload
        ),
      };

    default:
      return state;
  }
}

function ExercisesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { savedExercises } = state;

  useEffect(() => {
    localStorage.setItem('savedExercises', JSON.stringify(savedExercises));
  }, [savedExercises]);

  async function paginate(page) {
    dispatch({ type: 'page/changed', payload: page });
  }

  async function resetExercises() {
    dispatch({ type: 'exercises/reset' });
  }

  function addToSavedExercises(id) {
    dispatch({ type: 'savedExercises/added', payload: id });
  }

  function removeFromSavedExercises(id) {
    dispatch({ type: 'savedExercises/removed', payload: id });
  }

  return (
    <ExercisesContext.Provider
      value={{
        ...state,
        paginate,
        resetExercises,
        addToSavedExercises,
        removeFromSavedExercises,
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
