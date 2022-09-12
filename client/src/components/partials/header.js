import React,{useState} from 'react';

const Header = () => {
  const [expand, setExpand] = useState(false);
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <div className="logo-text-wrapper">
          <h1>Weather App</h1>
        </div>
        <div className="nav-list-wrapper">
          {/* <i
            className="fa-solid fa-bars"
            onClick={() => {
              setExpand(prev=>!prev);
            }}
          ></i>
           */}
            <ul className="nav-list">
              <li className="nav-item nav-button">
                <a href="" className="nav-link">
                  Login
                </a>
              </li>
            </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
