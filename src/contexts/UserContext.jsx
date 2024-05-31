import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  userName: localStorage.getItem('userName') || '',
  userGender: localStorage.getItem('userGender') || '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'userName/updated':
      return { ...state, userName: action.payload };

    case 'userGender/updated':
      return { ...state, userGender: action.payload };

    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [{ userName, userGender }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function updateUserName(name) {
    dispatch({ type: 'userName/updated', payload: name });
    localStorage.setItem('userName', name);
  }

  function updateUserGender(gender) {
    dispatch({ type: 'userGender/updated', payload: gender });
    localStorage.setItem('userGender', gender);
  }

  return (
    <UserContext.Provider
      value={{ userName, userGender, updateUserName, updateUserGender }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('context out of the provider');
  return context;
}

export { UserProvider, useUser };
