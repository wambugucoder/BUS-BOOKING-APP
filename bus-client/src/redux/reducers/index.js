import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BusReducer from './BusReducer';

const rootReducer = combineReducers({
  auth:AuthReducer,
  bus:BusReducer,
});

export default rootReducer