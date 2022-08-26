import React, { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    ifClicked();
  }, []);
  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=44757745454031361bc7e5de478c75ef&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("oops there seems to be error(wrong location");
          }
          alert("oops there seems to be an error");
          throw new Error("you have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .then((error) => {
        console.log(error);
      });
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=5dnyHqvlNp9uOZa-1385ShQOqLVvTP5axBalFUhZaU0`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
