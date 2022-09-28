import React, { useContext, useEffect, useState } from "react";
import sunriseIcon from "../../icons/sun-rise.svg";
import sunsetIcon from "../../icons/sun-set.svg";
import SearchBar from './searchBar'
import "./weather.css";
import { RingLoader } from "react-spinners";
import { LocationContext } from "../../context";
import { useFetchData,changeBackground } from "../../Hooks";

export default function Weather() {
  const APIkey = '3c69e44246ed2a47cfbeb82438bad733'
  const {city,units,setCity} = useContext(LocationContext);
  const [background,setBackground] = useState("images/clear-day.jpg")
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=${units}`
  // const url = `http://api.openweathermap.org/geo/1.0/reverse?appid=${APIkey}&lat=${latitude}&lon=${longitude}`;

  //function to get user city name from co-ordinates
  const getUserLocation = () => {
    console.log('entered in user location')
    navigator.geolocation.getCurrentPosition(async (data) => {
      console.log(data.coords)
      const { latitude, longitude } = data.coords;
      const APIkey = "3c69e44246ed2a47cfbeb82438bad733";
      const url = `http://api.openweathermap.org/geo/1.0/reverse?appid=${APIkey}&lat=${latitude}&lon=${longitude}`;
      const res = await fetch(url);
      const resJson = await res.json();
      const { name } = await resJson[0];
      if(name){
        // toast.info("fetching live location", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        // });
      }
      console.log(name)
      setCity(name);
    });
  };

  const setIcon = (icon, date) => {
    const tempDate = new Date(date);
    return tempDate.dayStatus() === "day" ? (
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        style={{ width: "50px", height: "50px" }}
        alt=""
      />
    ) : (
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
    );
  };

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
    if (this.getHours() <= 12) return "day";
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
      default:
        return "unknown"
    }
  };

  const fetchHelper = (data) => {
    try {
      const {
        dt,
        sys: { sunrise, sunset },
        wind,
        name,
        weather: [{ main, icon, id }],
        main: { temp, humidity },
      } = data;
      const riseTemp = new Date(sunrise);
      const rise = riseTemp.createTime()
      const setTemp = new Date(sunset);
      const set = setTemp.createTime();
      console.log(rise, set);
      return { dt, rise, set, name, main, id, icon, temp, humidity, wind };
    } catch (err) {
      // toast.error("there is some error please try again!!!", {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      // });
      console.log('error in fetch helper in live component:',err.message)
      return  ' '
    }
  };

  const {res} = useFetchData(url,fetchHelper,null,[city,units]);

  useEffect(()=>{
    setBackground(changeBackground(res?res.main:null,res?res.dt:null))
    console.log(res)
  },[res])


  useEffect(() => {
    if(!city) getUserLocation();
  },[]);


  return (
    <div
      className="weather-app-wrapper"
      style={{
        backgroundImage: `url(
          ${background}
          )`,
      }}
    >
      <SearchBar></SearchBar>
      {res? (<div className="weather-app">
          <div className="weather-app-info">
            <h1 className="city">
              <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;
              {res ? res.name : "city"}
            </h1>
            <h3 className="time-details">
              <i className="fas fa-calendar-alt">&nbsp;&nbsp;</i>
              {res ? Date(res.dt) : "date"}
            </h3>
            <div className="weather-app-info-wrapper">
              <div className="weather-app-info-status">
                <h3 className="temp">
                  {res ? (
                    <span>
                      {res.temp}{" "}
                      <span style={{ fontSize: "35px" }}>
                        {units === "metric" ? ` ℃` : ` ℉`}
                      </span>
                    </span>
                  ) : (
                    <i className="fa-solid fa-temperature-empty"></i>
                  )}
                </h3>
                <span className="status">
                  {res ? (
                    res.main
                  ) : (
                    <i
                      className="fa-solid fa-cloud"
                      style={{ color: "#2f2e3f" }}
                    ></i>
                  )}
                  {res && setIcon(res.icon, res.dt)}
                </span>
              </div>
              <div className="weather-app-info-status" id="climate-status">
                <h4 className="wind">
                  <i
                    className="fa-solid fa-wind"
                    style={{ color: "rgb(116,194,168)" }}
                  ></i>
                  &nbsp;&nbsp;Wind :&nbsp;
                  <span>{res ? res.wind.speed : " -- "}</span>
                </h4>
                <h4 className="humidity">
                  <i
                    className="fa-solid fa-droplet"
                    style={{ color: "rgb(65,167,190)" }}
                  ></i>
                  &nbsp;&nbsp;Humidity :&nbsp;
                  <span>{res ? res.humidity : " -- "}</span>
                </h4>
                <h4 className="temp-2">
                  <i
                    className="fa-solid fa-temperature-half"
                    style={{ color: "rgb(149,24,16)" }}
                  ></i>
                  &nbsp;&nbsp;Temp :
                  <span>
                    {res ? res.temp : " -- "}&nbsp;&nbsp;
                    {units === "metric" ? `℃` : `℉`}
                  </span>
                </h4>
              </div>
              <div className="weather-app-info-status" id="sun-status">
                <h4 className="rise">
                  <img className="icon" alt="" src={sunriseIcon} color="D7B51B" />
                  &nbsp;Rise : <span>{res ? res.rise : "--"}</span>
                </h4>
                <h4 className="high">
                  <img className="icon" alt="" src={sunsetIcon} />
                  &nbsp;set : <span>{res ? res.set : "--"}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>)
        :
      (<div className="loader">
        <RingLoader></RingLoader>
        <p className="loading">loading...</p>
      </div>
      )}
    </div>
  );
}
