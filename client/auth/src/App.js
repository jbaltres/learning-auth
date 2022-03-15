import './App.css';
import {useState} from "react";
import Axios from "axios";

function App() {

  const [name,setName] = useState("");
  const [employer,setEmployer] = useState("");
  const [age,setAge] = useState(18); 

  const [userData, setUserData] = useState([]);

  function handleSelectChange(event) {
    setEmployer(event.target.value);
}
  const addUser = () => {
    // der .post Befehl bekommt zwei Atrribute zugegwiesen(url, ObjectBody). URL ist hier localhost weil 
    // der server.js sich auf dem gleichen Gerät befindet und der Port 3001 wurde in der server.js deklariert.
    // Die URL muss also die Serveradresse und den Serverport beinhalten.
    // Der ObjectBody enthält KeyValue Pairs

    console.log("Front End: addUser: " + name +" "+employer+" " + age)

    Axios.post('http://localhost:3001/create', 
    {
      nameKey: name, 
      selectedEmployerKey: employer,
      ageKey: age,

    }).then(() => {console.log("success")});
    

  }
// der Key im Key-Value-Pair wird im post befehl überegben und der Wert in einer neuen Variable gespeichert

    const getbookedRooms = () => {
      Axios.get('http://localhost:3001/getUser').then((response) => {
      console.log("Front End: getbookedRooms: response Data: "+ response.data.toString())
      setUserData(response.data)
      });
    }

    const deleteReservation = (id) => {
      console.log("Front End: deleteReservation with ID: "+id)
      Axios.delete(`http://localhost:3001/delete/${id}`);
    }

  return (
    <>
    <h1>Authentifizierung</h1>
    {/*Wenn eingeloggt, Namen anzeigen, sonst "Gast"*/}
    <h2>Hallo {userData.name}</h2>
 
    <div className="App">
      <div className="Form">
  
        <h3>Arbeitgeber</h3>
        <select value={employer} onChange={handleSelectChange}>
            <option value="BVA"> BVA</option>
            <option value="Accenture">Accenture</option>
            <option value="Pascha">Pascha</option>
        </select>
        <h3>Name</h3>
       <input className="Inputfield" type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
        
       <h3>Alter</h3>
       <input className="Inputfield" type="text" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
        
          
        
        <button className="FormButton" onClick={() => addUser()}>User hinzufügen</button>
      </div>
      
  
 
    
    
    

      -------------------------------------------------------------------------------------------------
      <p></p>
      <button className="FormButton" onClick={getbookedRooms}>Reservierungen anzeigen</button>
      <br/>
      
      
      {userData.map((value, key) => {
        return(
        <div className="Card_Wrapper">  
        <div className="Reservation_Card">
        <div className="ListEntry">Buchender: {value.name}</div>
        <div className="ListEntry">Datum: {value.employer}</div>
        <div className="ListEntry">Raumnummer: {value.age}</div>
        
        <button className="FormButton2" onClick={() => deleteReservation(value.id)}>Reservierung stornieren</button>
        </div>
        </div>
        )
      })}
    </div>
    </>
    // Der Button führt mit onClick die Funktion addReservation aus. Diese 
    //style={{ display: buttonState ? "block" : "none" }}
    );
}

export default App;