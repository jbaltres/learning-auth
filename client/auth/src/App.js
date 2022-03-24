import './App.css';
import {
  BrowserRouter as Router,
  Route, Switch,
} from "react-router-dom";
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Update from './components/Update';

function App() {

  
  return (
    <>
    <Router>
      <Switch>
      <Route path="/register">
        <Register />
    </Route>
    <Route exact path="/">
        <Home />
    </Route>
    <Route path="/login">
        <Login />
    </Route>
    <Route path="/update">
        <Update />
    </Route>
      </Switch>
    </Router>
    </>
    // Der Button führt mit onClick die Funktion addReservation aus. Diese 
    //style={{ display: buttonState ? "block" : "none" }}
    );
}

export default App;