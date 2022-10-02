import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context';


const Header = () => {
  const {user,setUser} = React.useContext(UserContext)
  const [display,setDisplay] = useState(true)

  const location = useLocation()

  useEffect(()=>{
    if(location.pathname==='/auth'){setDisplay(false)}
    else{setDisplay(true)}
  },[location])

  return (
    <header style={{display:display?"":"none"}}>
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="logo-text-wrapper">
          <h1>Weather App</h1>
        </div>
        <div>
        {
        user?
        <button className='nav-button' onClick={()=>{setUser(false)}}>Logout</button>: 
        <button className='nav-button' onClick={()=>{window.location.href="/auth"}}>Login</button>
      }
        </div>
      </nav>
    </header>
  );
};
export default Header;
