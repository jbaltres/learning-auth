import {useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";


function Update() {
    const [actualAccount,setActualAccount] = useState("Alfresco");

    const getUser = () => {
        Axios.post('http://localhost:3001/getUser', {
          actualAccountKey: actualAccount,
        }).then((response) => {
        setUserData(response.data)
        console.log("Front End: getSpecificUser: response Data: "+ response.data) 
    
        });
    
      }
    
  const [userData,setUserData] = useState([]);
  console.log(userData)
  const a = userData.age;
  console.log(a)
  const [name,setName] = useState(userData.name);
  const [employer,setEmployer] = useState(userData.employer);
  const [age,setAge] = useState(userData.age);
  const [password,setPassword] = useState(userData.password);
  

  console.log("Der aktuelle Account ist:" + actualAccount)
  

  function handleSelectChange(event) {
    setActualAccount(event.target.value);
}

function handleSelectEmployer(event) {
    setEmployer(event.target.value);
}



  return (
    <>
    <select value={actualAccount} onChange={handleSelectChange}>
            <option value="Alfresco"> Alfresco</option>
            <option value="Ute">Ute</option>
        </select>
    <h1>Update your Site</h1>
 
    <div className="App">
      <div className="Form">
      <h3>Name</h3>
       <input className="Inputfield" type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
        <h3>Arbeitgeber</h3>
        <select value={employer} onChange={handleSelectEmployer}>
            <option value="BVA"> BVA</option>
            <option value="Accenture">Accenture</option>
            <option value="Pascha">Pascha</option>
        </select>
       <h3>Alter</h3>
       <input className="Inputfield" type="text" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
       <h3>Password</h3>
       <input className="Inputfield" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
       <button className="FormButton" onClick={() => getUser()}>Bestimmten User anzeigen.</button>

       {userData.map((value, key) => {
        return(
        <div className="Card_Wrapper">  
        <div className="Reservation_Card">
        <div className="ListEntry" key={key}>Name: {value.name}</div>
        <div className="ListEntry">Arbeitgeber: {value.employer}</div>
        <div className="ListEntry">Alter: {value.age}</div>
        <div className="ListEntry">PW: {value.password}</div>
        
        {/*<button className="FormButton2" onClick={() => deleteReservation(value.id)}>Reservierung stornieren</button>*/}
        </div>
        </div>
        )
      })}

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