import React, { useEffect,useState,useContext } from 'react';
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
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        fetch(url,{mode:'cors'})
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            setCords((i)=>({...i,lat:data[0].lat,lon:data[0].lon}))
        })
    }

    
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cords.lat||0}&lon=${cords.lon||0}&exclude=minutely,hourly&appid=${apiKey}&units=${units}`

    function fetchHelper(res){
        console.log("inside fetch data day")
        const data = res.daily
        const dailyData = [] 
        data.forEach(element => {
            console.log("inside loop")
            console.log(element)
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
        console.log(dailyData);
        return dailyData;
    }

    const {res, setRes} = useFetchData(url,fetchHelper,null,[cords,units]);

    useEffect(()=>{
        setBackground(changeBackground(res?res.main:null,res?res.dt:null))
        console.log(res)
    },[res])

    useEffect(()=>{
        getCoordinates();
    },[city,units])

    useEffect(()=>{
        console.log(cords)
    },[cords])
    return(
        <section className='weather' 
        style={{
            backgroundImage: `url(
              ${background}
              )`,
          }}>  
        <SearchBar></SearchBar>  
        <div className='days'>
        {res&&res.map((day,index)=>(<DayCard day={day} key={index}></DayCard>))}
        </div>
        </section>
    )

}

export default WeatherHourly;