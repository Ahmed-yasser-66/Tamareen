import { createContext, useContext, useReducer } from 'react';

const PlanContext = createContext();

const initialState = {
  name: localStorage.getItem('planName') || '',
  days: localStorage.getItem('planDays')
    ? Number(localStorage.getItem('planDays'))
    : null,
  exercises: localStorage.getItem('planExercises')
    ? JSON.parse(localStorage.getItem('planExercises'))
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'name/changed':
      localStorage.setItem('planName', action.payload);
      return { ...state, name: action.payload };

    case 'days/changed': {
      const newExercises = Array.from({ length: action.payload }, () => []);
      localStorage.setItem('planDays', Number(action.payload));
      localStorage.setItem('planExercises', JSON.stringify(newExercises));
      return {
        ...state,
        days: Number(action.payload),
        exercises: newExercises,
      };
    }

    case 'days/added': {
      const newExercises = [...state.exercises, []];
      localStorage.setItem('planDays', state.days + 1);
      localStorage.setItem('planExercises', JSON.stringify(newExercises));
      return {
        ...state,
        days: Number(state.days + 1),
        exercises: newExercises,
      };
    }

    case 'days/removed': {
      const newExercises = [...state.exercises.slice(0, -1)];
      localStorage.setItem('planDays', state.days - 1);
      localStorage.setItem('planExercises', JSON.stringify(newExercises));
      return {
        ...state,
        days: Number(state.days - 1),
        exercises: newExercises,
      };
    }

    case 'exercise/added': {
      const { day, exercise } = action.payload;

      const exerciseExisted = state.exercises[day - 1].some(
        (existingExercise) => existingExercise.id === exercise.id
      );

      if (exerciseExisted) {
        return state;
      }

      const newExercises = state.exercises.map((exercisesForDay, index) =>
        index + 1 === day ? [...exercisesForDay, exercise] : exercisesForDay
      );

      localStorage.setItem('planExercises', JSON.stringify(newExercises));
      return {
        ...state,
        exercises: newExercises,
      };
    }

    case 'exercise/deleted': {
      const { day, id } = action.payload;
      const newExercises = state.exercises.map((exercisesForDay, index) =>
        index + 1 === day
          ? exercisesForDay.filter((exercise) => exercise.id !== id)
          : exercisesForDay
      );

      localStorage.setItem('planExercises', JSON.stringify(newExercises));
      return {
        ...state,
        exercises: newExercises,
      };
    }

    case 'plan/deleted': {
      localStorage.removeItem('planDays');
      localStorage.removeItem('planName');
      localStorage.removeItem('planExercises');
      return { ...state, name: '', days: null, exercises: [] };
    }

    default:
      return state;
  }
}

function PlanProvider({ children }) {
  const [{ name, days, exercises }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function changeName(name) {
    dispatch({ type: 'name/changed', payload: name });
  }

  function changeDays(days) {
    dispatch({ type: 'days/changed', payload: days });
  }

  function addExercise(day, exercise) {
    dispatch({ type: 'exercise/added', payload: { day, exercise } });
  }

  function deleteExercise(day, id) {
    dispatch({ type: 'exercise/deleted', payload: { day, id } });
  }

  function addDay() {
    dispatch({ type: 'days/added' });
  }

  function removeDay() {
    dispatch({ type: 'days/removed' });
  }

  function deletePlan() {
    dispatch({ type: 'plan/deleted' });
  }

  return (
    <PlanContext.Provider
      value={{
        name,
        days,
        exercises,
        changeName,
        changeDays,
        addExercise,
        deleteExercise,
        addDay,
        removeDay,
        deletePlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}

export { PlanProvider, usePlan };
