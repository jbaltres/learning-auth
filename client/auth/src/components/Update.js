import {useState, useEffect} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";


function Update() {
    const [actualAccount,setActualAccount] = useState("Alfresco");
    const [userData,setUserData] = useState([{name:"(Lädt Namen)", employer:"(Lädt)", age:"(Lädt Alter)", password:""}]);

    useEffect(() => {
        Axios.post('http://localhost:3001/getUser', {
          actualAccountKey: actualAccount,
        }).then((response) => {
        console.log("Front End: getSpecificUser: response Data: "+ response.data) 
        setUserData(response.data)
        setName(response.data[0].name)
        setOldName(response.data[0].name)
        setEmployer(response.data[0].employer)
        setAge(response.data[0].age)
        setPassword(response.data[0].password)
        
        });
    
      },[actualAccount])
  
  
  if (userData.length > 0){
    console.log(userData[0].name)
  } else{
    console.log("Noch kein Array vorhanden")
  }

  const [name,setName] = useState(userData[0].name);
  console.log("Die Länge des Arrays " + userData.length)
  console.log("Der State name " + name)
  const [employer,setEmployer] = useState(userData[0].employer);
  const [age,setAge] = useState(userData[0].age);
  const [password,setPassword] = useState(userData[0].password);
  const [oldName,setOldName] = useState(userData[0].name);
  
  console.log("hier ist der name " + name + " hinterlegt")
  console.log("hier ist der employer " + employer + " hinterlegt")
  console.log("hier ist der ageg " + age + " hinterlegt")
  console.log("hier ist der pw " + password + " hinterlegt")
  console.log("hier ist der Oldname " + oldName + " hinterlegt")

  console.log("Der aktuelle Account ist:" + actualAccount)
  
  

  function handleSelectChange(event) {
    setActualAccount(event.target.value);
}

function handleSelectEmployer(event) {
    setEmployer(event.target.value);
}

const updateUser = () => {
  Axios.put('http://localhost:3001/updateUser', {nameKey: name, selectedEmployerKey: employer, ageKey: age, passwordKey: password, oldNameKey: oldName})
}

  return (
    <>
    <select value={actualAccount} onChange={handleSelectChange}>
            <option value="Alfresco"> Alfresco</option>
            <option value="Hanswurst">Ute</option>
        </select>
    <h1>Update your Site</h1>
    <h1>
    {userData.map((value, key) => {
        return(
        <div className="Card_Wrapper">  
        <div className="Reservation_Card">
        <div className="ListEntry" key={key}>Hallo: {value.name} </div>
        {/*<button className="FormButton2" onClick={() => deleteReservation(value.id)}>Reservierung stornieren</button>*/}
        </div>
        </div>
        
        )
      })}    
    </h1>
 
    <div className="App">
      <div className="Form">
      {userData.map((value, key) => {
        return(
        <h3 className="ListEntry" key={key}>Name: {value.name} </h3>
        )
      })}    
      Ihr Neuer Username:
       <input className="Inputfield" type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
        <h3>Arbeitgeber</h3>
        <select value={employer} onChange={handleSelectEmployer}>
            <option value="BVA"> BVA</option>
            <option value="Accenture">Accenture</option>
            <option value="Pascha">Pascha</option>
            <option value="(Lädt)">Lädt</option>
        </select>
       <h3>Alter</h3>
       <input className="Inputfield" type="text" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
       <h3>Password</h3>
       <input className="Inputfield" type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
       {/*<button className="FormButton" onClick={() => getUser()}>Bestimmten User anzeigen.</button>*/}

       {userData.map((value, key) => {
        return(
        <div className="Card_Wrapper">  
        <div className="Reservation_Card">
        <div className="ListEntry" key={value.name}>Name: {value.name}</div>
        <div className="ListEntry">Arbeitgeber: {value.employer}</div>
        <div className="ListEntry">Alter: {value.age}</div>
        <div className="ListEntry">PW: {value.password}</div>
        
        {/*<button className="FormButton2" onClick={() => deleteReservation(value.id)}>Reservierung stornieren</button>*/}
        </div>
        </div>
        )
      })}
            <button className="FormButton2" onClick={() => updateUser()}>User Updaten</button>

      <Link to="/home">
       <button className="FormButton2" type="button">
          Home!
       </button>
      </Link>




      </div>
    </div>
    </>
     );
}

export default Update;