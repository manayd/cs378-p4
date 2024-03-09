import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
function App() {

  const [result, setResult] = React.useState(null);
  const [chart, setChart] = React.useState(null);

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

    markPoints(playerName);
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
      getPlayerData(buttonName, 0);
    });

    buttonNameInput.value = "";
}

function markPoints(playerName, count) {
  console.log("Mark Points Success");
    try {
      fetch(`https://nba-stats-db.herokuapp.com/api/shot_chart_data/${playerName}/2023/`, requestOptions)
      .then(response => response.json())
      .then(data =>{
        setChart(data);
        console.log(data['results']);
      })
    } catch {
      console.log("error")
    }


  var image = document.getElementById('myImage');
  var canvas = document.getElementById('pointCanvas');
  var context = canvas.getContext('2d');

  // Set the canvas size to match the image size
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image on the canvas
  context.drawImage(image, 0, 0);

  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  context.lineWidth = 2;
  if(chart != null) {
    for (var i = 0; i < chart['results'].length; i++) {
      context.fillStyle = 'red';
      context.strokeStyle = 'red';
      var top = chart['results'][i]['top'];
      var left = chart['results'][i]['left'];
      if(chart['results'][i]['result']) {
        context.fillStyle = 'green';
        context.strokeStyle = 'green';
      }
      context.beginPath();
      context.arc(left, top, 5, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
    }
  } else {
    if(count < 3) {
      sleep(3000).then(() => {
        console.log("Get's here")
        markPoints(playerName, count + 1);
      })
    }  
  } 
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


  return(
    <div>
     <h1>Learn about your favorite NBA Player's 2023 Season</h1>
     <h2>Double click button for updated shot chart.</h2>
     <h2>Note: Shot chart data is only available for the three existing players: Stephen Curry, James Harden, and Lebron James</h2>
     <div id="buttonContainer">
            <button onClick={() => getPlayerData("Stephen Curry")}>Stephen Curry</button> 
            <button onClick={() => getPlayerData("James Harden")}>James Harden</button> 
            <button onClick={() => getPlayerData("LeBron James")}>LeBron James</button> 
     </div>

    <label for="buttonName">Enter Player Name:</label>
    <input type="text" id="buttonName" placeholder="Type something..."></input>
    <button onClick={createButton}>Submit</button>
    <div id='textImgContainer'>
      <div id='textContainer'>
        <h2>{result != null ? "Name: " + result['results'][0]['player_name'] : "No data found"}</h2>
        <h4>{result != null ? "Free Throw Percentage: " + (100 * (result['results'][0]['ft_percent'])).toFixed(2) + "%" : "No data found"}</h4>
        <h4>{result != null ? "3 point percentage: " + (100 * (result['results'][0]['three_percent'])).toFixed(2) + "%": "No data found"}</h4>
        <h4>{result != null ? "3 point attempts: " + result['results'][0]['three_attempts']: "No data found"}</h4>
        <h4>{result != null ? "Field goal percentage: " + (100 * (result['results'][0]['field_percent'])).toFixed(2) + "%": "No data found"}</h4>
        <h4>{result != null ? "Total points: " + result['results'][0]['PTS']: "No data found"}</h4>
        <h4>{result != null ? "Total assists: " + result['results'][0]['AST']: "No data found"}</h4>
        <h4>{result != null ? "Total rebounds: " + result['results'][0]['TRB']: "No data found"}</h4>
        <h4>{result != null ? "Total steals: " + result['results'][0]['STL']: "No data found"}</h4>
        <h4>{result != null ? "Games played: " + result['results'][0]['games']: "No data found"}</h4>
        <h4>{result != null ? "Total minutes played: " + result['results'][0]['minutes_played']: ""}</h4>
      </div>
      <div id="imageContainer">
        <img id="myImage" src={require('./nbahalfcourt.png')} alt="NBA Half Court Image"></img>
        <canvas id="pointCanvas"></canvas>
      </div>
    </div>
    

    

    </div>
  )
}

export default App;
