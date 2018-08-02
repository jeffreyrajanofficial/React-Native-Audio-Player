import { combineReducers } from "redux";
import PlayerStateReducer from "./PlayerStateReducer";

const rootReducer = combineReducers({ PlayerStateReducer });

export default rootReducer;
