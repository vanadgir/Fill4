import axios from "axios";
import { useState, useEffect } from "react";
import weatherApiKey from "../modules/weatherApiKey";

export default function DateTime() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    setCurrentDate(`${month}/${day}/${year}`);
  }, []);

  useEffect(() => {
    // requires user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=imperial`;

          axios
            .get(weatherApiUrl)
            .then((response) => {
              const weatherData = response.data;
              setCurrentWeather({
                desc: weatherData.weather[0].description,
                src: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                loc: weatherData.name.toLowerCase(),
                temp: `${weatherData.main.temp} °F`,
              });
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
            });
        },
        function (error) {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <div className="date-time">
      <div className="dt-top">
        <span>{currentDate}</span>
        <span>{currentTime}</span>
        <span>{currentWeather.loc}</span>
      </div>
      <div className="dt-bottom">
        <span>{currentWeather.desc}</span>
        {currentWeather.src && (
          <img
            src={currentWeather.src}
            alt="Weather Icon"
            style={{ maxHeight: "25px", maxWidth: "25px" }}
          />
        )}
        <span>{currentWeather.temp}</span>
      </div>
    </div>
  );
}
