/* eslint-disable import/no-anonymous-default-export */
import { IS_LOADING, REGISTER_USER ,GET_ERRORS} from "../actions/Types";

const INITIAL_STATE = {
    isLoading:false,
    isRegistered:false,
    errors:false,
    errorMessage:{},
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
        default:
            return state;
    }
};