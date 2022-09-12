import './App.css';
import {Header,Footer} from './components/partials'
import {WeatherLive} from './components/weather'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React,{useState} from 'react';

function App() {
  // const [city, setCity] = useState(null);
  // const [units, setUnits] = useState("standard");
  // const ProviderValue = {
    // city,units,setCity,setUnits
  // }
  return (
    <div className="App">
      <BrowserRouter>
        {/* <LocationContext.Provider value={ProviderValue}> */}
        <Header></Header>
        <Routes>
          <Route path='/' exact element={<WeatherLive/>}/>
        </Routes>
      <Footer></Footer>
        {/* </LocationContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
