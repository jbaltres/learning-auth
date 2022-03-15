const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require ('cors');
// const { request, response } = require('express');

// Dieser Funktionsaufruf aktiviert den Empfang von Front-End Nachrichten.
app.use(cors());

// Das Body Objekt, das vom Front End geschickt wird, wird als JSON String verschickt.
// Dieser Funktionsaufruf bewirkt, dass JSON Strings automatisch geparsed - und für das Back End leserlich wird.
app.use(express.json());

const db = mysql.createPool({
    user: 'root',
    host: '192.168.178.53', //Das ist die IP-Adresse der virtuellen Linux-Maschine MUSS evtl. geändert werden!!!
    password: 'alfresco123', 
    database: 'userauth'
});

// Route zum Erstellen eines Users. (URL: localhost:3001/create)
app.post('/create', (request, response) => {
    //Die Variable aus dem Front-End holen und in neuer Variable in Back-End speichern
    const savedName = request.body.nameKey
    const savedemployer = request.body.selectedEmployerKey
    const savedAge = request.body.ageKey
    const savedPassword = request.body.passwordKey

        db.query("INSERT INTO userlist (name, employer, age, password) VALUES (?,?,?,?)" ,
        [savedName, savedemployer, savedAge, savedPassword],
        
        (err, result) =>{if (err)
            {
                console.log(err)
                return 
            } else {
                return
            }
        });
        
    response.send("Create Aufruf wurde beendet.")

    // Jetzt werdend die Variablen von oben genommen und in die Tabelle einegfügt.


   

});

app.get('/getUser', (request, response) => {
    db.query("SELECT * FROM userlist", (err, result) => {if (err)
    {
        console.log(err)
    }else{
        response.send(result);
    }
})
})

app.post('/checkCredentials', (request, response) => {
    //Die Variable aus dem Front-End holen und in neuer Variable in Back-End speichern
    const savedName = request.body.nameKey
    const savedPassword = request.body.passwordKey
    //console.log("Show Name" + savedName)
    db.query("SELECT * FROM userlist where name = ? AND password = ?", [savedName, savedPassword], (err, result) => {if (err)
    {        
        console.log(err)
    }else{
        if (result.length == 1)
        {
            console.log("User in Datenbank vorhanden.")
            response.send("Success");
        }
        else
        {
            console.log("User NICHT in Datenbank vorhanden.")
            response.send("Fail");
        }
        
    }
})
})

app.delete('/delete/:id', (request, response) => {
    console.log("Empfange ID: "+ request.params.id)
    const id = request.params.id
    db.query("Delete FROM rooms WHERE id = ?", id,  (err, result) => {
        if (err)
        {
            console.log(err)
        }else{
            response.send(result);
        }
    });
    });

let port = 3001
app.listen(port, () => {console.log("Server is running on port " + port)} );