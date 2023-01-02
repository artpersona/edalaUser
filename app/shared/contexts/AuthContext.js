import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import {
  storeLoggedUser,
  getLoggedUser,
  storeAuthToken,
  getAuthToken,
} from '../utils/storage.utility';

import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  //   States
  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // End States

  // Functions
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://192.168.1.11:8000/api/login', {
          email,
          password,
        })
        .then(data => {
          setLoggedUser(data.data.user);
          setToken(data.data.access_token);
          storeAuthToken(data.data.access_token);
          storeLoggedUser(data.data.user);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const registerViaEmail = data => {
    console.log('data is: ', data);
    return new Promise((resolve, reject) => {
      axios
        .post('http://192.168.1.11:8000/api/checkProfileExists', {
          email: data.email,
        })
        .then(() => {
          axios
            .post('http://192.168.1.11:8000/api/register', {
              email: data.email,
              password: data.password,
              firstName: data.firstName,
              lastName: data.lastName,
            })
            .then(response => {
              storeLoggedUser(response.data.user);
              storeAuthToken(response.data.token);
              setLoggedUser(response.data.user);
              resolve(response.data);
            })
            .catch(error => {
              console.log('errss is: ', error);
              reject(error);
            });
        })
        .catch(err => {
          console.log('err is: ', err);
          reject(err.response?.data?.message);
        });
    });
  };

  const logout = () => {
    setLoggedUser(null);
    storeLoggedUser(null);
    setToken(null);
    storeAuthToken(null);
    setInitialized(false);
  };
  // End Functions

  // Use Effects
  useEffect(() => {
    async function getUser() {
      const user = await getLoggedUser();
      const token = await getAuthToken();
      if (user) {
        setInitialized(true);
        setLoggedUser(user);
        setToken(token);
      }
    }
    getUser();
  }, []);

  const payload = {
    token,
    loggedUser,
    initialized,
    setLoggedUser,
    registerViaEmail,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={useMemo(() => payload, [loggedUser, initialized, token])}>
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
export const useAuthContext = () => useContext(AuthContext);
