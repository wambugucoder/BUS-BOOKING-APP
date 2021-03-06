/* eslint-disable import/no-anonymous-default-export */
import { IS_LOADING, REGISTER_USER ,GET_ERRORS, LOGIN_USER, GET_SPECIFIC_USER,LOGOUT_USER, PROCEED_TO_PAYMENT} from "../actions/Types";

const INITIAL_STATE = {
    isLoading:false,
    isRegistered:false,
    errors:false,
    errorMessage:{},
    isAuthenticated:false,
    user:{},
    userDetails:{},
    isAcquired:false,
    isReady:false,
    redirectL:{}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading:true,
                isRegistered:false,
                errors:false,
            };
            case REGISTER_USER:
                return {
                    ...state,
                    isLoading:false,
                    isRegistered:true,
                    errors:false,
                };
                case GET_ERRORS:
                     return {
                        ...state,
                        isLoading:false,
                        errors:true,
                        errorMessage:action.payload 
                     };
                     case LOGIN_USER:
                        return {
                            ...state,
                            isLoading:false,
                            isAuthenticated:true,
                            user:action.payload
                         };
                         case GET_SPECIFIC_USER:
                        return {
                            ...state,
                            isLoading:false,
                            isAcquired:true,
                            userDetails:action.payload
                         };
                         case LOGOUT_USER:
                            return {...state,
                           isAuthenticated:false,
                           user:{}
                            };
                            case PROCEED_TO_PAYMENT:
                            return {...state,
                           isReady:true,
                           redirectL:action.payload
                            };
                         
        default:
            return state;
    }
};