import React, { useContext, useEffect, useState } from "react"
import './daycard.css'
import sunriseIcon from "../../icons/sun-rise.svg";
import sunsetIcon from "../../icons/sun-set.svg";

function DayCard({day}){

    function changeBackgroundColor(){
        var k,m;
        console.log(day)
        switch (day.main) {
            case "Thunderstorm":
                k="https://images.pexels.com/photos/9751579/pexels-photo-9751579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
              break;
            case "Drizzle":
                k="https://images.pexels.com/photos/6858659/pexels-photo-6858659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            break;
            case "Rain":
                k="https://img.freepik.com/premium-photo/rain-water-drop-falling-city-street-floor-heavy-rain-day_1962-2005.jpg?w=2000" ;                 
            break;
            case "Snow":
                k = "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1366919.jpg&fm=jpg";
            break;
            case "Clear":
                k = 'https://images.pexels.com/photos/1477010/pexels-photo-1477010.jpeg?cs=srgb&dl=pexels-irina-iriser-1477010.jpg&fm=jpg';
            break;
            case "Clouds":
                k = 'https://images.pexels.com/photos/1019991/pexels-photo-1019991.jpeg?auto=compress&cs=tinysrgb&w=600';
            break;
            case "Ash":
                k="https://images.pexels.com/photos/11617689/pexels-photo-11617689.jpeg?auto=compress&cs=tinysrgb&w=600";
            break;
            case "Haze":
                k="https://images.pexels.com/photos/1743392/pexels-photo-1743392.jpeg?auto=compress&cs=tinysrgb&w=600";
            break;
            default:
                k="https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          return k;
    }

    function settime(){

    }
    
    return(
     <>   <div className="card-wrapper">
        <div className="card " style={{backgroundImage:`url(${changeBackgroundColor()})`}} >
            <div className="card-top">
                <div className="day-icon">
                    <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt=""/>
                    <span className="" id='main'>{day.main}</span>
                </div>
                <div className="weather-status">
                    <span className="" id='temp'><span>
                    {day ? Math.round(day.temp['day']) : " -- "}&nbsp;℃
                  </span></span>
                    <span className="" id='city'>{day.city}</span>
                    <span className="" id='city'>{new Date(day.dt*1000).toDateString()}</span>
                </div>
            </div>
            <div className="card-middle">
                <div className="detail" id="wind">
                    <span>
                    <i
                    className="fa-solid fa-wind"
                    style={{ color: "rgb(116,194,168)" }}>
                    </i>&nbsp;&nbsp;Wind :
                    </span>
                    <span>{day.wind_gust||'-'}</span>
                </div>
                <div className="detail" id="pressure">
                    <span>
                        <i
                        className="fa-solid fa-droplet"
                        style={{ color: "rgb(65,167,190)" }}
                                          ></i>
                    
                  &nbsp;&nbsp;Humidity :</span>
                  <span>{day.humidity||'-'}</span>
                  
                </div>
                <div className="detail" id="">
                <span>
                <i className="fa-regular fa-wpressr" style={{color:"white"}}></i>                    
                &nbsp;pressure:</span>
                <span>{day.pressure||'-'}</span>
                </div>
            </div>
            <div className="card-bottom">
                <div className="detail-mini"> 
                <img className="icon" alt="" src={sunriseIcon} color="D7B51B" />rise&nbsp;<br/>
                <span className="" id="rise">{day.rise}</span></div>
                <div className="detail-mini"> 
                <img className="icon" alt="" src={sunsetIcon} color="D7B51B" />set&nbsp;<br/>
                <span className="" id="set">{day.set}</span></div>
            </div>
        </div>
    </div>
    </>
    )
}

export default DayCard