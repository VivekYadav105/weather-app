import React, { useEffect,useState,useContext } from 'react';
import { RingLoader } from 'react-spinners';
import { LocationContext } from '../../context';
import { changeBackground,useFetchData } from '../../Hooks';
import DayCard from '../main/dayCard';
import SearchBar from './searchBar';

function WeatherHourly(props){

    const {city,units,setCity,setUnits} = useContext(LocationContext)
    const [background,setBackground] = useState("./images/clear-day.jpg")

    const [cords,setCords] = useState({lat:null,lon:null})

    const apiKey = '3c69e44246ed2a47cfbeb82438bad733';

    useEffect(()=>{setUnits('metric')},[])

    function getCoordinates(){
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        fetch(url,{mode:'cors'})
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            console.log(data)
            if(data) setCords((i)=>({...i,lat:data[0].lat,lon:data[0].lon}))
            else alert('enter a correct city')
        })
    }

    
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cords.lat||0}&lon=${cords.lon||0}&exclude=minutely,hourly&appid=${apiKey}&units=${units}`

    function fetchHelper(res){
        console.log("inside fetch data day")
        const data = res.daily
        const dailyData = [] 
        data.forEach(element => {
            const {
                dt,sunrise, sunset,
                moonrise,moonset,
                wind_gust,
                weather: [{ main, icon, id }],
                humidity,
                temp,
                pressure
              } = element;
              const riseTemp = new Date(sunrise);
              const rise = riseTemp.toDateString()
              const setTemp = new Date(sunset);
              const set = setTemp.toDateString()
              dailyData.push({ dt,rise,set,moonrise,moonset,wind_gust,main,icon,id,temp,humidity,temp,pressure,city});
        }); 
        return dailyData;
    }

    const {res, setRes} = useFetchData(url,fetchHelper,null,[cords,units]);

    useEffect(()=>{
        setBackground(changeBackground(res?res.main:null,res?res.dt:null))
    },[res])

    useEffect(()=>{
        getCoordinates();
    },[city,units])

    return(
        <section className='weather' 
        style={{
            backgroundImage: `url(
              ${background}
              )`,
          }}>  
        <SearchBar></SearchBar>  
        <div className='days'>
        {res?res.map((day,index)=>(<DayCard day={day} key={index}></DayCard>))
        :(
        <div className="loader">
            <RingLoader></RingLoader>
            <p className="loading">loading...</p>
        </div>)}
        </div>
        </section>
    )

}

export default WeatherHourly;