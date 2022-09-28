import './App.css';
import {Header,Footer} from './components/partials'
import {WeatherLive,WeatherDay} from './components/weather'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import {LocationContext,UserContext} from './context'
import Auth from './components/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [city, setCity] = useState(null);
  const [units, setUnits] = useState("standard");
  const [user,setUser] = useState(false)
  const ProviderValue = {
    city,units,setCity,setUnits
  }

  useEffect(()=>{
    if(city) localStorage.setItem('city',JSON.stringify(city));
    else localStorage.getItem('city')
    console.log(city)
  },[city])

  useEffect(()=>{
    if(!user){
      setUser(sessionStorage.getItem('userToken'))
    }
  },[])

  useEffect(()=>{
    if(user){
      sessionStorage.setItem('userToken',user)
    }
  },[user])


  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{user,setUser}}>
      <ToastContainer position='top-middle' autoClose={5000} newestOnTop={false} closeOnClick></ToastContainer>
        <LocationContext.Provider value={ProviderValue}>
        <Header></Header>
          <Routes>
            <Route path='/auth' exact element={<Auth/>}/>
            <Route path='/' exact element={<WeatherLive/>}/>
            <Route path='/day' exact element={user?<WeatherDay/>:<Navigate to="/auth"/>}/>
            {/* <Route path='/map' exact element={<MapComponent/>}/> */}
          </Routes>
        <Footer></Footer>
        </LocationContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
