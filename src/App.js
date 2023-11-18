import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '1188d07cae4e6e82270d9f8061cb7bc5'; // Replace with your API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherCard = ({ day, highTemp, lowTemp, condition, humidity, sunrise, sunset }) => {
  return (
    <div className="weathercard">
      <h2>{day}</h2>
      <div className="weather-card">
      <img src={`./images/${condition.toLowerCase()}.png`} alt={condition} />
    
      <p>High: {highTemp}°C</p>
      <p>Low: {lowTemp}°C</p>
      <p>Condition: {condition}</p>
      <p>Humidity: {humidity}%</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
      </div>
      </div>
  );
};

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (city !== '') {
      axios
        .get(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&cnt=5`)
        .then((response) => {
          setWeatherData(response.data.list);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [city]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <div className="heading"><h1>Weather 99</h1></div>
      <div className="search-bar">
      <div className="cityname"><h2>{city}</h2> <p>coordinates</p> </div> 
       <form className="wrapper">
        
        <input type="text" placeholder="Enter city..." onChange={(e) => setCity(e.target.value)} />
        <button onClick={() => handleSearch(city)}>Search</button>
      </form>
      </div>
      <div className="weather-forecast">
      <div className="firstcard"> 
        <label className="ddate" for="date">Select Date</label> <br></br>
<input type="date" id="date" name="date"></input>
           <h4>High Temperature Low Temperature Humidity sunrise time sunset time</h4>
           
        </div>
        {weatherData.map((data, index) => (
          <WeatherCard
            key={index}
            day={data.dt_txt}
            
            highTemp={data.main.temp_max}
            lowTemp={data.main.temp_min}
            condition={data.weather[0].main}
            humidity={data.main.humidity}
            sunrise={data.sys.sunrise}
            sunset={data.sys.sunset}
          />
        ))}
      </div>
    </div>
  );
};

export default App;