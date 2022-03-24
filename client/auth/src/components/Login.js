import {useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";


function Login() {

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [loginState,setLoginState] = useState("");


  const checkCredentials = () => {
 
        Axios.post('http://localhost:3001/checkCredentials', {
          nameKey: name,
          passwordKey: password
        }).then((response) => {
        setLoginState(response.data)
        console.log("Front End: getSpecificUser: response Data: "+ response.data) 

        });
  
      }

      let loginMessage = ""
      switch (loginState){
        case "":
          break;
        case "Success":
          loginMessage = "Sie wurden erfolgreich eingeloggt!"
          break;
        case "Fail":
          loginMessage = "Die Anmeldung ist fehlgeschlagen"
          break;
        default:
          break;
      }

      
  return (
    <>
    <h1>Login</h1>
    {loginMessage}
    <div className="App">
      <div className="Form">
      <h3>Name</h3>
       <input className="Inputfield" type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
     <h3>Password</h3>
       <input className="Inputfield" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        
        <button className="FormButton" onClick={() => checkCredentials()}>Anmelden</button>
      <Link to="/">
       <button className="FormButton2" type="button">
          Home!
       </button>
      </Link>
      </div>
    </div>
    </>
    );
}

export default Login;