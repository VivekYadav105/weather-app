import { useState } from "react";
import { Link } from "react-router-dom";

function NavBottom() {
  const [active,setActive] = useState(0)

  return (
    <div className="nav-bottom">
      <ul id="nav-list-bottom">
        <div className="circle" id="nav-bottom-circle" style={{transform:`translateX(${active*64.5}px) translateY(-50%)`,}}></div>
        <li className="nav-item" onClick={()=>{setActive(0)}}>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
          </Link>
        </li>
        <li className="nav-item" onClick={()=>{setActive(1)}}>
          <Link to="/map">
          <i class="fa-solid fa-map-location-dot"></i>
          </Link>
        </li>
        <li className="nav-item" onClick={()=>{setActive(2)}}>
          <Link to="/day">
            <i className="fa-solid fa-clock"></i>
          </Link>
        </li>
        <li className="nav-item" onClick={()=>{setActive(3)}}>
          <Link to="/savedPlaces">
          <i class="fa-solid fa-bookmark"></i>
          </Link>
        </li>
      </ul>
      
    </div>
  );
}

export default NavBottom