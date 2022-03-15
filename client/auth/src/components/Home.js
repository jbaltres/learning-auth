import {useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function Home() {

  const [userData, setUserData] = useState([]);

// der Key im Key-Value-Pair wird im post befehl überegben und der Wert in einer neuen Variable gespeichert

    const getUserList = () => {
      Axios.get('http://localhost:3001/getUser').then((response) => {
      console.log("Front End: getbookedRooms: response Data: "+ response.data.toString())
      setUserData(response.data)
      });
    }

/*    const deleteReservation = (id) => {
      console.log("Front End: deleteReservation with ID: "+id)
      Axios.delete(`http://localhost:3001/delete/${id}`);
    }
*/

  return (
    <>
    <h1>Authentifizierung</h1>
    {/*Wenn eingeloggt, Namen anzeigen, sonst "Gast"*/}
    <h2>Hallo {userData.name}</h2>
 
    <div className="App">
  
        <button className="FormButton" onClick={() => getUserList()}>User anzeigen</button>
 
          <p></p>
      {/*<button className="FormButton" onClick={getbookedRooms}>Reservierungen anzeigen</button>*/}
      <br/>
      <Link to="/register">
       <button className="FormButton" type="button">
          Register!
       </button>
      </Link>
      
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
    </div>
    </>
  )
}

export default Home;