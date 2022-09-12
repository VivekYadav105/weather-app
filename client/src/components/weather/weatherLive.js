import React, { useCallback,useContext, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import searchIcon from "../../icons/search.svg";
import farienheiticon from "../../icons/fahrenheit.svg";
import celsiusIcon from "../../icons/celsius.png";
import sunriseIcon from "../../icons/sun-rise.svg";
import sunsetIcon from "../../icons/sun-set.svg";
import "./weather.css";
import { RingLoader } from "react-spinners";
import { LocationContext } from "../../App";

export default function Weather() {
  const cityRef = useRef(null);
  const {city,units,setCity,setUnits} = useContext(LocationContext)
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityRef.current.value);
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      toast.info("fetching live location", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      const { latitude, longitude } = data.coords;
      const APIkey = "3c69e44246ed2a47cfbeb82438bad733";
      const url = `http://api.openweathermap.org/geo/1.0/reverse?appid=${APIkey}&lat=${latitude}&lon=${longitude}`;
      const res = await fetch(url);
      const resJson = await res.json();
      const { name } = await resJson[0];
      setCity(name);
    });
  };

  const setIcon = (icon, date) => {
    const tempDate = new Date(date);
    return tempDate.dayStatus() == "day" ? (
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        style={{ width: "50px", height: "50px" }}
      />
    ) : (
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    );
  };

  const changeBackground = (main, date) => {
    const temp = new Date(date);
    switch (main) {
      case "Thunderstorm":
        return temp.dayStatus() == "night"
          ? "./images/thunderstorm-night.jpg"
          : "./images/thunderstorm-day.jpg";
      case "Drizzle":
        return temp.dayStatus() == "night"
          ? "./images/drizzle-night.jpg"
          : "./images/drizzle-day.jpg";
      case "Rain":
        return temp.dayStatus() == "night"
          ? "./images/rain-night.jpg"
          : "./images/rain-day.jpg";
      case "Snow":
        return temp.dayStatus() == "night"
          ? "./images/snow-night.jpg"
          : "./images/snow-day.jpg";
      case "Clear":
        return temp.dayStatus() == "night"
          ? "./images/clear-night.jpg"
          : "./images/clear-day.jpg";
      case "Clouds":
        return temp.dayStatus() == "night"
          ? "./images/clouds-night.jpg"
          : "./images/clouds-day.jpg";
      case "Ash":
        return temp.dayStatus() == "night"
          ? "./images/volcano-night.jpg"
          : "./images/volcano-day.jpg";
        case "Haze":
          return temp.dayStatus() == "night"
            ? "./images/haze-day.jfif"
             : "./images/haze-day.jfif";
    }
  };

  //custom date declarations
  Date.prototype.createTime = function () {
    if (this.getHours() < 12) {
      this.status = "AM";
      return `${this.getHours()}:${this.getMinutes()} ${this.status}`;
    } else {
      this.status = "PM";
      if (this.getHours > 12)
        return `${this.setHours(this.getHours() - 12)}:${this.getMinutes()} ${
          this.status
        }`;
      return `${this.getHours()}:${this.getMinutes()} ${this.status}`;
    }
  };

  Date.prototype.dayStatus = function () {
    if (this.getHours() < 12) return "day";
    else return "night";
  };

  Date.prototype.getDayName = function () {
    switch (this.getDay()) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };

  const fetchHelper = async (url, APIkey) => {
    try {
      const res = await fetch(url);
      const resJson = await res.json();
      if (res) {
        toast.success("data fetched successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
      const {
        dt,
        sys: { sunrise, sunset },
        wind,
        name,
        weather: [{ main, icon, id }],
        main: { temp, humidity },
      } = resJson;
      const riseTemp = new Date(sunrise);
      const rise = riseTemp.createTime()
      const setTemp = new Date(sunrise);
      const set = setTemp.createTime();
      console.log(sunrise, sunset);
      console.log(rise, set);
      return { dt, rise, set, name, main, id, icon, temp, humidity, wind };
    } catch (err) {
      toast.error("there is some error please try again!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  const fetchData = async () => {
    const APIkey = "3c69e44246ed2a47cfbeb82438bad733";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=${units}`;
    try {
      const k = await fetchHelper(url, APIkey);
      console.log(k);
      setTimeout(() => {
        setData(k);
      }, 1000);
    } catch (err) {}
  };

  useEffect(() => {
    // if(city) {localStorage.setItem("city",city); localStorage.setItem("units",units);}
    fetchData();
  }, [city, units]);

  useEffect(() => {
    if(!city) getUserLocation();
  },[]);

  return (
    <div
      className="weather-app-wrapper"
      style={{
        backgroundImage: `url(${
          data ? changeBackground(data.main, data.dt) : "./images/clear-day.jpg"
        })`,
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="search-bar-wrapper">
          <input id="search-bar" type={"text"} ref={cityRef} required />
          <img
            src={searchIcon}
            alt="search"
            id="search-icon"
            onClick={handleSubmit}
          />
          <img
            src={farienheiticon}
            alt="search"
            className={`temp-icon ${units == "metric" ? `inactive` : ``}`}
            id="temp-icon-farienheit"
            onClick={() => {
              setUnits("metric");
            }}
          />
          <img
            src={celsiusIcon}
            alt="search"
            className={`temp-icon ${units != "metric" ? `inactive` : ``}`}
            id="temp-icon-celsius"
            onClick={() => {
              setUnits("standard");
            }}
          />
        </div>
      </form>
      {data ? (
        <div className="weather-app">
          <div className="weather-app-info">
            <h1 className="city">
              <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;
              {data ? data.name : "city"}
            </h1>
            <h3 className="time-details">
              <i className="fas fa-calendar-alt">&nbsp;&nbsp;</i>
              {data ? Date(data.dt) : "date"}
            </h3>
            <div className="weather-app-info-wrapper">
              <div className="weather-app-info-status">
                <h3 className="temp">
                  {data ? (
                    <span>
                      {data.temp}{" "}
                      <span style={{ fontSize: "35px" }}>
                        {units == "metric" ? ` ℃` : ` ℉`}
                      </span>
                    </span>
                  ) : (
                    <i className="fa-solid fa-temperature-empty"></i>
                  )}
                </h3>
                <span className="status">
                  {data ? (
                    data.main
                  ) : (
                    <i
                      className="fa-solid fa-cloud"
                      style={{ color: "#2f2e3f" }}
                    ></i>
                  )}
                  {data && setIcon(data.icon, data.dt)}
                </span>
              </div>
              <div className="weather-app-info-status" id="climate-status">
                <h4 className="wind">
                  <i
                    className="fa-solid fa-wind"
                    style={{ color: "rgb(116,194,168)" }}
                  ></i>
                  &nbsp;&nbsp;Wind :&nbsp;
                  <span>{data ? data.wind.speed : " -- "}</span>
                </h4>
                <h4 className="humidity">
                  <i
                    className="fa-solid fa-droplet"
                    style={{ color: "rgb(65,167,190)" }}
                  ></i>
                  &nbsp;&nbsp;Humidity :&nbsp;
                  <span>{data ? data.humidity : " -- "}</span>
                </h4>
                <h4 className="temp-2">
                  <i
                    className="fa-solid fa-temperature-half"
                    style={{ color: "rgb(149,24,16)" }}
                  ></i>
                  &nbsp;&nbsp;Temp :
                  <span>
                    {data ? data.temp : " -- "}&nbsp;&nbsp;
                    {units == "metric" ? `℃` : `℉`}
                  </span>
                </h4>
              </div>
              <div className="weather-app-info-status" id="sun-status">
                <h4 className="rise">
                  <img className="icon" src={sunriseIcon} color="D7B51B" />
                  &nbsp;Rise : <span>{data ? data.rise : "--"}</span>
                </h4>
                <h4 className="high">
                  <img className="icon" src={sunsetIcon} />
                  &nbsp;set : <span>{data ? data.set : "--"}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      ):(<div className="loader">
        <RingLoader></RingLoader>
        <p className="loading">loading...</p>
      </div>)
    }
    </div>
  );
}
