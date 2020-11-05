import { IS_LOADING, REGISTER_USER ,GET_ERRORS} from "./Types";
import axios from "axios";

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