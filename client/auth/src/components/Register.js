import {useState, useEffect} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function Register() {

  const [name,setName] = useState("");
  const [employer,setEmployer] = useState("BVA");
  const [age,setAge] = useState(18);
  const [password,setPassword] = useState("");
  const [returnMessageValue,setReturnMessageValue] = useState(true)
  const [userData, setUserData] = useState([]);
  const [checkRegisterName,setCheckRegisterName] = useState(true)
  
  let returnMessage = ""
  if (!returnMessageValue){
    returnMessage = "Erfolgreich Registriert"
  }

  let checkingName = ""
  if (!checkRegisterName){
    checkingName = "Username schon belegt"
  }

  function handleSelectChange(event) {
    setEmployer(event.target.value);
}

useEffect(() => {
    Axios.get('http://localhost:3001/getUserList').then((response) => {
    console.log("Front End: getbookedRooms: response Data: "+ response.data.toString())
    setUserData(response.data)
    });
},[])

const getUserList = () => {
  Axios.get('http://localhost:3001/getUserList').then((response) => {
    if (userData.some(response => response.name === name)) {
      console.log("Diesen Wert gibt es schon")
      setCheckRegisterName(false)
      setTimeout(() => {
        setCheckRegisterName(returnMessageValue => !returnMessageValue)
      }, 5000);
    }
    else{
      console.log("Namen noch nicht in der Datenbank vorhanden")
      addUser();
    }
  console.log("Front End: getbookedRooms: response Data: "+ response.data.toString())
  setUserData(response.data)
  })
  .then(() => console.log("Überprüfung abgeschlossen"));
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
      .then(() => setName("")) 
      .then(() => setAge(""))
      .then(() => setEmployer(""))
      .then(() => setPassword(""))
      .then(() => setReturnMessageValue(false))  
      .then(() => setTimeout(() => {
        setReturnMessageValue(returnMessageValue => !returnMessageValue)
      }, 5000));   
      
  }

/*    const deleteReservation = (id) => {
      console.log("Front End: deleteReservation with ID: "+id)
      Axios.delete(`http://localhost:3001/delete/${id}`);
    }
*/
  return (
    <>
    <div className="Registration_Wrapper">
      <h1>Authentifizierung</h1>
    </div>
    <div className="Registration_Wrapper">
      <h2 className={returnMessage ? "Successregistration" : null }>{returnMessage}</h2>
      <h2 className={checkingName ? "Successregistration" : null }>{checkingName}</h2>
    </div>
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
       
        <button className="FormButton" onClick={() => getUserList()}>Registrierung abschicken</button>
        <div> 
        <Link to="/">
       <button className="AuthButtonsRegisterForm" type="button">
          Hauptseite!
       </button>
      </Link>
      <Link to="/login">
       <button className="AuthButtonsRegisterForm" type="button">
          Login!
       </button>
      </Link>
      </div>
      </div>
    </div>
    </>
    // Der Button führt mit onClick die Funktion addReservation aus. Diese 
    //style={{ display: buttonState ? "block" : "none" }}
    );
}

export default Register;