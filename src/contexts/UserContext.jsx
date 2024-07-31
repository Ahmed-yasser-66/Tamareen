import { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const initialState = {
  userName: localStorage.getItem('userName') || '',
  userGender: localStorage.getItem('userGender') || '',
  isEditMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'userName/updated':
      return { ...state, userName: action.payload };

    case 'userGender/updated':
      return { ...state, userGender: action.payload };

    case 'user/edit':
      return { ...state, userName: '', userGender: '', isEditMode: true };

    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [{ userName, userGender, isEditMode }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function updateUserName(name) {
    localStorage.setItem('userName', name);
    dispatch({ type: 'userName/updated', payload: name });
  }

  function updateUserGender(gender) {
    localStorage.setItem('userGender', gender);
    dispatch({ type: 'userGender/updated', payload: gender });
  }

  function editUserData() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userGender');

    dispatch({ type: 'user/edit' });
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        userGender,
        updateUserName,
        updateUserGender,
        editUserData,
        isEditMode,
      }}
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
