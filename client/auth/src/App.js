import './App.css';
import {useState} from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route, Switch,
} from "react-router-dom";
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

function App() {

  
  return (
    <>
    <Router>
      <Switch>
      <Route path="/register">
        <Register />
    </Route>
    <Route path="/home">
        <Home />
    </Route>
    <Route path="/login">
        <Login />
    </Route>
      </Switch>
    </Router>
    </>
    // Der Button führt mit onClick die Funktion addReservation aus. Diese 
    //style={{ display: buttonState ? "block" : "none" }}
    );
}

export default App;