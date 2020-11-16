import { IS_LOADING, REGISTER_USER ,GET_ERRORS, LOGIN_USER, GET_ALL_BUSES, REGISTER_BUS, GET_SPECIFIC_USER,GET_SPECIFIC_BUS,PROCEED_TO_PAYMENT,LOGOUT_USER} from "./Types";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from "../../utils/setAuthToken";

export const registerUser = (UserData) => dispatch => {
 dispatch({ type:IS_LOADING  })
  axios.post("/api/v1/register",UserData).then(res =>
    dispatch({
      type:REGISTER_USER ,
    })
  )
  .catch((errors) => {
    dispatch({
        type:GET_ERRORS ,
        payload: errors.response.data
      }) 
  });
};
export const loginUser = (UserData) => dispatch => {
  dispatch({ type:IS_LOADING  })
  axios.post("/api/v1/login",UserData).then(res =>{
    const {token}=res.data;
    localStorage.setItem("jwtToken",token)
     setAuthToken(token);
     let decoded =jwt_decode(token)
     dispatch({
      type:LOGIN_USER ,
      payload:decoded
    })
  })
  .catch((errors) => {
    dispatch({
        type:GET_ERRORS ,
        payload: errors.response.data
      }) 
  });
};
export const getAllBuses = () => dispatch => {
  dispatch({ type:IS_LOADING  })
  axios.get("/api/v1/buses").then(res =>
    dispatch({
      type:GET_ALL_BUSES ,
      payload: res.data
    })
  );
};
export const registerBus = (BusDetails) => dispatch => {
  dispatch({ type:IS_LOADING  })
  axios.post("/api/v1/bus",BusDetails).then(res =>
    dispatch({
      type: REGISTER_BUS,
      
    })
  ).catch((errors) => {
    dispatch({
        type:GET_ERRORS ,
        payload: errors.response.data
      }) 
  });
};
export const getSpecificUser = (uid) => dispatch => {
  dispatch({ type:IS_LOADING  })
  axios.get(`/api/v1/users/${uid}`).then(res =>
    dispatch({
      type: GET_SPECIFIC_USER,
      payload: res.data
    })
  ).catch((errors) => {
    dispatch({
        type:GET_ERRORS ,
        payload: errors.response.data
      }) 
  });
};
export const getSpecificBus = (bid) => dispatch => {
  dispatch({ type:IS_LOADING  })
  axios.get(`/api/v1/bus/${bid}`).then(res =>
    dispatch({
      type: GET_SPECIFIC_BUS,
      payload: res.data
    })
  ).catch((errors) => {
    dispatch({
        type:GET_ERRORS ,
        payload: errors.response.data
      }) 
  });
};
export const proceedToPayment = (uid,bid) => dispatch => {
  dispatch({ type:IS_LOADING  })
  axios.post(`/api/v1/pay/${uid}/${bid}`).then(res =>{
    dispatch({
        type:PROCEED_TO_PAYMENT,
        payload: res.data
      })
    
    
  }).catch((errors) => {
    dispatch({
        type:GET_ERRORS ,
        payload: errors.response.data
      }) 
  });
};
export const LogOutUser = () => dispatch => {
  // Remove token from local storage
 localStorage.removeItem("jwtToken");
 // Remove auth header for future requests
 setAuthToken(false);
  dispatch({
   type:LOGOUT_USER ,
   
 })
   
 };