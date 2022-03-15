import './App.css';
import {useState} from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Private from './components/Private';
import Home from './components/Home';

function App() {

  
  return (
    <>
    <Router>
      <Switch>
      <Route path="/privateroute">
        <Private />
    </Route>
    <Route path="/home">
        <Home />
    </Route>
      </Switch>
    </Router>
    </>
    // Der Button führt mit onClick die Funktion addReservation aus. Diese 
    //style={{ display: buttonState ? "block" : "none" }}
    );
}

export default App;