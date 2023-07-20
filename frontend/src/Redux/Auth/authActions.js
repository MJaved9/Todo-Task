import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// User login
export const login = (email,password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/user/login', { email,password});
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

// User registration
export const register = ( email, password,age) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/user/signup', { email, password,age});
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.error,
    });
  }
};
