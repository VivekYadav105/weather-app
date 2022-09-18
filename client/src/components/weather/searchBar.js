import {LocationContext} from '../../context'
import React,{ useRef,useContext } from 'react';

import searchIcon from "../../icons/search.svg";
import farienheiticon from "../../icons/fahrenheit.svg";
import celsiusIcon from "../../icons/celsius.png";

export default function SearchBar(props){
    const cityRef = useRef(null);

    const {units,setCity,setUnits} = useContext(LocationContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(cityRef.current.value);
    };
    return(
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
            className={`temp-icon ${units === "metric" ? `inactive` : ``}`}
            id="temp-icon-farienheit"
            onClick={() => {
              setUnits("metric");
            }}
          />
          <img
            src={celsiusIcon}
            alt="search"
            className={`temp-icon ${units !== "metric" ? `inactive` : ``}`}
            id="temp-icon-celsius"
            onClick={() => {
              setUnits("standard");
            }}
          />
        </div>
      </form>    
    )
}