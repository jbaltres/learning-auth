import {useState} from "react";
import Axios from "axios";
import {useHistory,Link} from "react-router-dom";

function Login() {

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  


  const checkCredentials = () => {
 
        Axios.post('http://localhost:3001/checkCredentials', {
          nameKey: name,
          passwordKey: password
        }).then((response) => {
        setLoginState(response.data)
        console.log("Front End: getSpecificUser: response Data: "+ response.data)
        console.log("THIS IS"+response.data[0].name) 
        if (response.data[0].name === name){
          console.log("Gut digga")
        }
        else{
          console.log("Du Schwachkopf!")
        }
        if (response.data[0].name === name){
        setTimeout(() => { 
            routeTo();
          },5000);  
          }
          else{
            console.log("Es konnte nicht redirected werden!")
          }
        
        });
  
      }

      const [loginState,setLoginState] = useState([{name: "Gast"}]);

      let history = useHistory();

      function routeTo() {
        history.push("/update");
      }


      
      let loginMessage = "Keine Anmeldung vorhanden"
      switch (true){
        case (loginState[0].name === "Gast") :
          loginMessage = "Anmelden bitte"
          break;
        case (loginState !== "Fail") :
          loginMessage = "Sie wurden erfolgreich eingeloggt!"
          break;
        case loginState === "Fail" :
          loginMessage = "Die Anmeldung ist fehlgeschlagen"
          break;
        default:
          break;
      }

      
  return (
    <>
    <h1>Login</h1>
    <div className="Greeting_Wrapper">
    <h2 className="Greeting">Hallo {loginState[0].name == null ? "Gast" : loginState[0].name}</h2>
    <h2 className="Greeting">{loginMessage}</h2>
    </div>
    <div className="App">
      <div className="Form">
      <h3>Name</h3>
       <input className="Inputfield" type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
     <h3>Password</h3>
       <input className="Inputfield" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        
        <button className="FormButton" onClick={() => checkCredentials()}>Anmelden</button>
      <Link to="/">
       <button className="AuthButtonsRegisterForm" type="button">
          Home!
       </button>
      </Link>
      <Link to="/register">
       <button className="AuthButtonsRegisterForm" type="button">
          Registrieren!
       </button>
      </Link>
      </div>
    </div>
    </>
    );
}

export default Login;