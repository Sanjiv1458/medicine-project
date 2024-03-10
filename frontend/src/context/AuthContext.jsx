// AuthContext.js
import { createContext, useReducer, useEffect } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const storedAuthState = JSON.parse(localStorage.getItem('authState')) || { user: null, isAuthenticated: false };

  const [state, dispatch] = useReducer(authReducer, storedAuthState);

  useEffect(() => {
    const saveStateToLocalStorage = () => {
      try {
        localStorage.setItem('authState', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving auth state to localStorage:', error);
      }
    };

    saveStateToLocalStorage();

    return saveStateToLocalStorage;
  }, [state]);

  const login = (user) => {
    dispatch({ type: LOGIN, payload: user });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

const refreshToken = async () => {
  try {
    const response = await authApi.refreshAccessToken();
    console.log(response);
    const res = await authApi.authenticateUser();
    dispatch({ type: LOGIN, payload: res.data.user });
  } catch (error) {
    console.error('Error refreshing token:', error);
    dispatch({ type: LOGOUT });
  }
};

  useEffect(() => {
    if (state.isAuthenticated !== null) {
      refreshToken();
    }
  }, [state.isAuthenticated]);

  return <AuthContext.Provider value={{ state, login, logout, refreshToken }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };