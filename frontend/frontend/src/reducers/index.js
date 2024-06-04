import { combineReducers } from "redux";
import tasksReducer from "./tasks";
import authReducer from "./auth";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  tasksReducer: tasksReducer,
  authReducer: authReducer,
  errorReducer: errors,
  messageReducer: messages,
});
