import {useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";


function Register() {

  const [name,setName] = useState("");
  const [employer,setEmployer] = useState("BVA");
  const [age,setAge] = useState(18);
  const [password,setPassword] = useState("");

  function handleSelectChange(event) {
    setEmployer(event.target.value);
}
  const addUser = () => {
    // der .post Befehl bekommt zwei Atrribute zugegwiesen(url, ObjectBody). URL ist hier localhost weil 
    // der server.js sich auf dem gleichen Gerät befindet und der Port 3001 wurde in der server.js deklariert.
    // Die URL muss also die Serveradresse und den Serverport beinhalten.
    // Der ObjectBody enthält KeyValue Pairs

    console.log("Front End: addUser: " + name +" "+employer+" " + age +" " + password)

    Axios.post('http://localhost:3001/create', 
    {
      nameKey: name, 
      selectedEmployerKey: employer,
      ageKey: age,
      passwordKey: password,

    }).then(() => {console.log("success")})    
  }

/*    const deleteReservation = (id) => {
      console.log("Front End: deleteReservation with ID: "+id)
      Axios.delete(`http://localhost:3001/delete/${id}`);
    }
*/
  return (
    <>
    <h1>Authentifizierung</h1>
 
    <div className="App">
      <div className="Form">
      <h3>Name</h3>
       <input className="Inputfield" type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
        <h3>Arbeitgeber</h3>
        <select value={employer} onChange={handleSelectChange}>
            <option value="BVA"> BVA</option>
            <option value="Accenture">Accenture</option>
            <option value="Pascha">Pascha</option>
        </select>
       <h3>Alter</h3>
       <input className="Inputfield" type="text" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
       <h3>Password</h3>
       <input className="Inputfield" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        
        <button className="FormButton" onClick={() => addUser()}>Registrierung abschicken</button>
        <Link to="/">
       <button className="FormButton2" type="button">
          Hauptseite!
       </button>
      </Link>
      <Link to="/home">
       <button className="FormButton2" type="button">
          Home!
       </button>
      </Link>
      </div>
    </div>
    </>
    // Der Button führt mit onClick die Funktion addReservation aus. Diese 
    //style={{ display: buttonState ? "block" : "none" }}
    );
}

export default Register;