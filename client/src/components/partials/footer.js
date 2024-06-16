import React,{useEffect, useState} from 'react';
import { Link, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function NavBottom() {
  const location = useLocation()
  const [active, setActive] = useState(0);

  useEffect(()=>{
    if(location.pathname=='/fav') setActive(2);
    else if(location.pathname=='/day') setActive(1);
    else setActive(0);
  },[location])

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
        <li className="nav-item">
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
        {/* <li className="nav-item">
          <Link to="/map" >
            <i className="fa-solid fa-map-location-dot" onClick={() => {
                setActive(1);
              }}></i>
          </Link>
        </li> */}
        <li 
          className="nav-item">
          <Link to="/day">
            <i className="fa-solid fa-clock" onClick={() => {
                setActive(1);
              }}></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/fav">
            <i className="fa-solid fa-bookmark" style={{paddingLeft:'4.5px'}} onClick={() => {
                setActive(2);
              }}></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBottom;
