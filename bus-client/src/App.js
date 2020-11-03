import './App.css';
import store from './redux/store'
import { Provider } from "react-redux";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Landing from './Components/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
     <Route exact path='/' component={Landing}/>
     
    </div>

    </Router>
   </Provider>
    
  );
}

export default App;
