import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import AuthReducer from "./Auth/authReducer";
import todoReducer from "./Todo/todoReducer"
import thunk from "redux-thunk";

const store = legacy_createStore(
  combineReducers({ AuthReducer,todoReducer }),
  applyMiddleware(thunk)
);

export { store };