import React,{useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function NavBottom() {
  const [active, setActive] = useState(0);

  const changeActive = ()=>{
    switch(window.location.href){
      case "/":
        setActive(0)
        break;
      case "/map":
        setActive(1)
        break;
      case "/day":
        setActive(2)
        break;
      case "/fav":
        setActive(3)
        break;
    }
  }

  useEffect(()=>{
    changeActive()
  },[])

  return (
    <div className="nav-bottom">
      <ul id="nav-list-bottom">
        <div
          className="circle"
          id="nav-bottom-circle"
          style={{ transform: `translateX(${active * 50}px) translateY(-50%)` }}
        ></div>
        <li className="nav-item" onClick={()=>{setActive(0)}}>
          <Link to="/">
            <i
              className="fa-solid fa-house"
              data-tip
              data-for="Home"
              onClick={() => {
                setActive(0);
              }}
            ></i>
            <ReactTooltip id="home" place="top" effect="solid">
              <span>Home</span>
            </ReactTooltip>
          </Link>
        </li>
        <li
          className="nav-item" 
          onClick={() => {
            setActive(1);
          }}>
          <Link to="/map" >
            <i className="fa-solid fa-map-location-dot" ></i>
          </Link>
        </li>
        <li 
          className="nav-item" onClick={()=>{setActive(2)}}>
          <Link to="/day">
            <i className="fa-solid fa-clock"></i>
          </Link>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            setActive(3);
          }}>
          <Link to="/savedPlaces">
            <i className="fa-solid fa-bookmark" ></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBottom;
