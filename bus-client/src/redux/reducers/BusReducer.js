/* eslint-disable import/no-anonymous-default-export */
import {GET_ALL_BUSES, IS_LOADING,GET_ERRORS,REGISTER_BUS, GET_SPECIFIC_BUS} from '../actions/Types';
const INITIAL_STATE = {
    isRetrieved:false,
    isLoading:false,
    isRegistered:false,
    errorMessage:{},
    bus:[],
    busDetails:{},
    isAcquired:false,
    
};
 
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_BUSES:
            return {...state,
                isRetrieved:true,
                isLoading:false,
                bus:action.payload
            };
            case IS_LOADING:
                return {...state,
                     isLoading:true,
                     };
                     case GET_ERRORS:
                        return {
                           ...state,
                           isLoading:false,
                           errors:true,
                           errorMessage:action.payload 
                        };
                        case REGISTER_BUS :
                            return {...state,
                                isRegistered:true,
                                isLoading:false,
                               
                            };
                            case GET_SPECIFIC_BUS :
                            return {...state,
                                isLoading:false,
                                isAcquired:true,
                                busDetails:action.payload
                               
                            };
                            
        default:
            return state
    }
}