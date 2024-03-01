import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
function App() {

  const [result, setResult] = React.useState(null);

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };


  const getPlayerData = async function(playerName) {
    console.log("Success");
    try {
      fetch(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`, requestOptions)
      .then(response => response.json())
      .then(data =>{
        setResult(data);
        console.log(data['results']);
      })
    } catch {
      console.log("error")
    }

  }

  function createButton() {
    var buttonNameInput = document.getElementById("buttonName");
    var buttonContainer = document.getElementById("buttonContainer");
    console.log(buttonNameInput);

    var buttonName = buttonNameInput.value;

    var newButton = document.createElement("button");
    newButton.innerHTML = buttonName;

    buttonContainer.appendChild(newButton);

    newButton.addEventListener("click", function() {
      // Call another method when the button is pressed
      getPlayerData(buttonName);
    });

    buttonNameInput.value = "";
}

  return(
    <div>
     <h1>Learn about your favorite NBA Player</h1>
     <div id="buttonContainer">
            <button onClick={() => getPlayerData("Luka Dončić")}>Luka Dončić</button> 
            <button onClick={() => getPlayerData("Dwight Powell")}>Dwight Powell</button> 
            <button onClick={() => getPlayerData("LeBron James")}>LeBron James</button> 
     </div>

    <label for="buttonName">Enter Button Name:</label>
    <input type="text" id="buttonName" placeholder="Type something..."></input>
    <button onClick={createButton}>Submit</button>

    <h2>{result != null ? "Name: " + result['results'][0]['player_name'] : "No data found"}</h2>
    <p>{result != null ? "Free Throw Percentage: " + (100 * (result['results'][0]['ft_percent'])).toFixed(2) + "%" : ""}</p>
    <p>{result != null ? "3 point percentage: " + (100 * (result['results'][0]['three_percent'])).toFixed(2) + "%": ""}</p>
    <p>{result != null ? "Field goal percentage: " + (100 * (result['results'][0]['field_percent'])).toFixed(2) + "%": ""}</p>
    <p>{result != null ? "Total points: " + result['results'][0]['PTS']: ""}</p>
    <p>{result != null ? "Total assists: " + result['results'][0]['AST']: ""}</p>
    <p>{result != null ? "Total rebounds: " + result['results'][0]['TRB']: ""}</p>

    </div>
  )
}

export default App;
