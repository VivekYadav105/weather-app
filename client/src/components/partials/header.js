import React from 'react';
import { UserContext } from '../../context';


const Header = () => {
  const {user,setUser} = React.useContext(UserContext)
  return (
    <header>
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
        <button className='nav-button' onClick={()=>{setUser(false);sessionStorage.removeItem('user')}}>Logout</button>: 
        <button className='nav-button' onClick={()=>{window.location.href="/auth"}}>Login</button>
      }
        </div>
      </nav>
    </header>
  );
};
export default Header;
