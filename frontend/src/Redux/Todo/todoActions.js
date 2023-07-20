import axios from "axios";
import {
  GET_TODOS_SUCCESS,
  GET_TODOS_FAIL,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
} from "./types";

// Get todos
export const getTodos = () => async (dispatch) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    };

    try {
      // Make an API request using Axios
      const response = await axios.get('http://localhost:8080/todo', config);

      // Dispatch an action with the retrieved data
      dispatch({
        type:GET_TODOS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      // Dispatch an action in case of an error
      dispatch({
        type: GET_TODOS_FAIL,
        payload: error.message
      });
    }
  };
};

// Add todo
export const addTodo = (title) => async (dispatch) => {
  try {
    const res = await axios.post("/api/todos", { title });
    dispatch({
      type: ADD_TODO_SUCCESS,
      payload: res.data.todo,
    });
  } catch (error) {
    dispatch({
      type: ADD_TODO_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Update todo
export const updateTodo = (id, updates) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/todos/${id}`, updates);
    dispatch({
      type: UPDATE_TODO_SUCCESS,
      payload: res.data.todo,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TODO_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Delete todo
export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/todos/${id}`);
    dispatch({
      type: DELETE_TODO_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TODO_FAIL,
      payload: error.response.data.error,
    });
  }
};
