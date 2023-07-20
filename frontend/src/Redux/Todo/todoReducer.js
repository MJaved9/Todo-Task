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

const initialState = {
  todos: [],
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        error: null,
      };
    case GET_TODOS_FAIL:
    case ADD_TODO_FAIL:
    case UPDATE_TODO_FAIL:
    case DELETE_TODO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        error: null,
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
        error: null,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
};

export default todoReducer;
