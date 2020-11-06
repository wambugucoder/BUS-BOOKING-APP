import { IS_LOADING, REGISTER_USER ,GET_ERRORS, LOGIN_USER} from "./Types";
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