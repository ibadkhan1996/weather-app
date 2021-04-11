import React, { useState } from "react";
import "./Weather.css";

function Weather() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState("");

  let apiKey = "c7684c0e9bdcc7f3b166fe3d53c0cf11";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;
  // const unsplashApi = `https://api.unsplash.com/search/photos?query=${weather.name}&client_id=V2DPGSa5Wr9Ogg0foeR8lKBAhHlXwwloUs241csm7e0`;

  const SearchCity = (e) => {
    if (e.keyCode === 13) {
      fetch(apiCall)
        .then((res) => res.json())
        .then((result) => {
          setWeatherData(result);
          setInput("");
          console.log(result);
        });
    }
  };
  const date = () => {
    const d = new Date();
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayArr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = d.getDate();
    const day = d.getDay();
    const month = d.getMonth();
    return `${monthArr[month]} ${date}, ${d.getFullYear()}`;
  };

  return (
    <div>
      <div className="weather">
        <input
          type="text"
          placeholder={"Enter your city..."}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => SearchCity(e)}
          value={input}
          className="weather__input"
        />

        {typeof weatherData.main != "undefined" ? (
          <div className="weather__card">
            <p className="weather__city">
              {weatherData.name}, {weatherData.sys.country}
            </p>
            <p className="weather__date">{date()}</p>
            <div className="weather__temp">
              <p>
                {`${Math.floor(weatherData.main.temp - 273)}`}
                <span>&deg;c</span>
              </p>
            </div>
            <div className="weather__info">
              <div>
                Humidity&nbsp;<span>{weatherData.main.humidity}</span>
              </div>
              <div>
                Wind&nbsp;<span>{weatherData.wind.speed}</span>
              </div>
            </div>
            <div className="weather__condition">
              <p>{weatherData.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt=""
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Weather;
