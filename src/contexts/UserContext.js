import React, { createContext, useContext, useReducer } from 'react';
import api from '../utils/api';
import {
  ERROR,
  INFO,
  LOCALSTORAGE_USERDATA,
  MESSAGE_SERVER_ERROR,
  MESSAGE_USER_ALREADY_EXISTED,
  MESSAGE_USER_NOT_REGISTERED,
  MESSAGE_USER_REGISTER_SUCCESS,
  SUCCESS,
  WARNING
} from '../utils/constants';
import { setItemOfLocalStorage } from '../utils/functions';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

// ----------------------------------------------------------------------

const initialState = {
  currentUserdata: null,
  winnersOfThisWeek: [],
  winnersOfLastWeek: []
};

const handlers = {
  SET_CURRENT_USERDATA: (state, action) => {
    return {
      ...state,
      currentUserdata: action.payload
    };
  },
  SET_WINNERS_OF_THIS_WEEK: (state, action) => {
    return {
      ...state,
      winnersOfThisWeek: action.payload
    };
  },
  SET_WINNERS_OF_LAST_WEEK: (state, action) => {
    return {
      ...state,
      winnersOfLastWeek: action.payload
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const UserContext = createContext({
  ...initialState,
  getUserdata: () => Promise.resolve(),
  getWinners: () => Promise.resolve(),
  registerUser: () => Promise.resolve(),
  updateBalance: () => Promise.resolve()
});

//  Provider
function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openAlert } = useContext(AlertMessageContext);
  const { openLoading, closeLoading } = useContext(LoadingContext);

  /**
   * Fetch userdata from server.
   * @param {*} walletAddress The address of connected wallet
   */
  const getUserdata = (walletAddress) => {
    openLoading();
    api.get(`/site/getUserdata/${walletAddress}`)
      .then(res => {
        dispatch({
          type: 'SET_CURRENT_USERDATA',
          payload: res.data
        });
        setItemOfLocalStorage(LOCALSTORAGE_USERDATA, res.data);
        closeLoading();
      })
      .catch(error => {
        if (error.response.status === 404) {
          openAlert({
            severity: INFO,
            message: MESSAGE_USER_NOT_REGISTERED
          });
        } else {
          openAlert({
            severity: ERROR,
            message: MESSAGE_SERVER_ERROR
          });
        }
        closeLoading();
      });
  };

  /**
   * Register a user
   * @param {object} userdata The data of a new user
   */
  const registerUser = (userdata) => {
    openLoading();
    api.post('/site/registerUser', userdata)
      .then(res => {
        dispatch({
          type: 'SET_CURRENT_USERDATA',
          payload: res.data
        });
        setItemOfLocalStorage(LOCALSTORAGE_USERDATA, res.data);
        openAlert({
          severity: SUCCESS,
          message: MESSAGE_USER_REGISTER_SUCCESS
        });
        closeLoading();
      })
      .catch(error => {
        if (error.response.status === 400) {
          openAlert({
            severity: WARNING,
            message: MESSAGE_USER_ALREADY_EXISTED
          });
        } else {
          openAlert({
            severity: ERROR,
            message: MESSAGE_SERVER_ERROR
          });
        }
        closeLoading();
      });
  };

  /** Get winners of this week and last one. */
  const getWinners = () => {
    api.get('/site/getWinners')
      .then(res => {
        console.log('# res => ', res);
        dispatch({
          type: 'SET_WINNERS_OF_THIS_WEEK',
          payload: res.data.winnersOfThisWeek
        });
        dispatch({
          type: 'SET_WINNERS_OF_LAST_WEEK',
          payload: res.data.winnersOfLastWeek
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          openAlert({
            severity: ERROR,
            message: MESSAGE_SERVER_ERROR
          });
        }
      });
  };

  /**
   * Update balance of current user
   * @param {number} idWalletAddress The user's "id_wallet_address"
   * @param {number} balance The user's current balance
   */
  const updateBalance = (idWalletAddress, balance) => {
    api.put(`/site/updateBalance/${idWalletAddress}`, { balance })
      .then(() => {
        const newCurrentUserdata = { ...state.currentUserdata, balance };
        dispatch({
          type: 'SET_CURRENT_USERDATA',
          payload: newCurrentUserdata
        });
        setItemOfLocalStorage(LOCALSTORAGE_USERDATA, newCurrentUserdata);
      })
      .catch(error => {
        console.log(error.status);
        openAlert({
          severity: ERROR,
          message: MESSAGE_SERVER_ERROR
        });
      });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUserdata,
        getWinners,
        registerUser,
        updateBalance
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };