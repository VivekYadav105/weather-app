import { useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function NavBottom() {
  const [active, setActive] = useState(0);

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
        <li
          className="nav-item"
          
        >
          <Link to="/map">
            <i className="fa-solid fa-map-location-dot" onClick={() => {
            setActive(1);
          }}></i>
          </Link>
        </li>
        <li
          className="nav-item"        >
          <Link to="/day">
            <i className="fa-solid fa-clock" onClick={() => {
            setActive(2);
          }}></i>
          </Link>
        </li>
        <li
          className="nav-item"
        >
          <Link to="/savedPlaces">
            <i className="fa-solid fa-bookmark" onClick={() => {
            setActive(3);
          }}></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBottom;
