import './App.css';
import {Header,Footer} from './components/partials'
import {WeatherLive,WeatherDay} from './components/weather'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React,{useState} from 'react';
import {LocationContext} from './context'

function App() {
  const [city, setCity] = useState(null);
  const [units, setUnits] = useState("standard");
  const ProviderValue = {
    city,units,setCity,setUnits
  }
  return (
    <div className="App">
      <BrowserRouter>
        <LocationContext.Provider value={ProviderValue}>
        <Header></Header>
          <Routes>
            <Route path='/' exact element={<WeatherLive/>}/>
            <Route path='/day' exact element={<WeatherDay/>}/>
            {/* <Route path='/map' exact element={<MapComponent/>}/> */}
          </Routes>
        <Footer></Footer>
        </LocationContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
