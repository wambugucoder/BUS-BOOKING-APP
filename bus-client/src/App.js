import './App.css';
import store from './redux/store'
import { Provider } from "react-redux";
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Landing from './Components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {LOGIN_USER,LOGOUT_USER} from './redux/actions/Types';
import  AddBus from './Components/Bus/AddBus';
import Booking from './Components/Booking/Booking';
import Success from './Components/Messages/Success';
import Failure from './Components/Messages/Failure';

//SESSION MANAGEMENT IN MAIN APP
if(localStorage.jwtToken){
  const token=localStorage.jwtToken
  //set header
 setAuthToken(token)
  //decode
  const decoded=jwt_decode(token)
  //call store to keep user authenticated and in session
  store.dispatch({
    type:LOGIN_USER,
    payload:decoded
  })

  // Check for expired token
 const currentTime= Date.now()/1000;
 if (decoded.exp < currentTime) {
   // Logout user
  store.dispatch({
     type:LOGOUT_USER,
     
   });
   // Redirect to login
   window.location.href = "/login";
 }
}
  
function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
     <Route exact path='/' component={Landing}/>
     <Route exact path='/login' component={Login}/>
     <Route exact path='/register' component={Register}/>
     <Route exact path='/create-bus' component={AddBus}/>
      <Route exact path='/dashboard' component={Dashboard}/>
      <Route exact path='/booking/:uid/:bid' component={Booking}/>
      <Route exact path='/success' component={Success}/>
      <Route exact path ='/failure' component={Failure}/>

      
     
    </div>

    </Router>
   </Provider>
    
  );
}

export default App;
