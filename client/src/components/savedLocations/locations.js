import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import FavouriteCard from '../main/favCard'

import searchIcon from "../../icons/search.svg";
import farienheiticon from "../../icons/fahrenheit.svg";
import celsiusIcon from "../../icons/celsius.png";

import { LocationContext, UserContext } from "../../context";
import './location.css'
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Locations(){

    const APIkey = '3c69e44246ed2a47cfbeb82438bad733';
    const user = useContext(UserContext) 
    const {units,setUnits} = useContext(LocationContext);
    const cityRef = useRef(null)
    const [savedLocations,setSavedLocations] = useState([])
    const [error,setError] = useState({status:false})

    const [data,setData] = useState([])

    async function handleSubmit(){
        const location = cityRef.current.value;
        if(location){
            const geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${APIkey}`
            const res = await axios.get(geoApi)
            if(res.status!==200){
                return toast.error("Not a correct location only cites are valid", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                      });
            }
            const token = sessionStorage.getItem("userToken")
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/weather/addLocation`,{location:location,userToken:sessionStorage.getItem('userToken')})
            if(response.status===200){
                toast.success("Location added to favourites", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                  });
            } 
            getLocations()
        } 
    }

    async function getLocations(){
        const {data:resJson} = await axios.post(`${process.env.REACT_APP_BACKEND}/weather/getSavedLocations`,{userToken:user});
        console.log(resJson)
        const {success,data} = resJson
        if(success==true){
            const saved = data.savedLocations
            if(saved.length) setSavedLocations(saved);
            else setSavedLocations([])
        }
        else{
            setError((i)=>({message:data.data,status:data.status}))
        }

    }

    async function removeLocation(name){
        const userToken = sessionStorage.getItem("userToken")
        const res = await axios.post(`${process.env.REACT_APP_BACKEND}/weather/deleteLocation`,{userToken,location:name})
        console.log(res)
        if(res.status===200){
            toast.success("Location removed from favourites",{position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,})
            window.location.reload()
        }
    }
    
    function getData(){
        if(savedLocations.length){    
            const res =[]
            savedLocations.forEach((i)=>{    
            axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${i}&appid=${APIkey}&units=metric`).then((response)=>(response.data)).then((resJson)=>{
                var {dt,main:{temp},name,weather:[{main}]} = resJson;
                const tempDate = new Date(dt*1000)
                const date = `${tempDate.getDate()} ${tempDate.getMonth()} ${tempDate.getFullYear().toString().substring(2,4)}`
                const time = tempDate.getHours()+":"+tempDate.getMinutes()
                console.log({date:date,status:main,temperature:temp,place:name,time:time})
                setData((i)=>([...i,{date:date,status:main,temperature:temp,place:name,time:time}]))
                
            })
        })
        console.log("res",res)
        setData(res);
        }
        else setData([])
    }

    useEffect(()=>{
        getLocations()
    },[])

    useEffect(()=>{
        getData()
        console.log(savedLocations)
    },[savedLocations])

    useEffect(()=>{
        toast.error(error.message,{position:"top-center",autoClose:4000})
        if(error.length){setData(false)}
    },[error])

    useEffect(()=>{
        console.log(data)
    },[data])

    return(
        <section className='location-wrapper' style={{background:`url(${'images/thunderstorm-day.jpg'})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <form style={{margin:"0rem 0 2rem 0"}}>
        <div className="search-bar-wrapper">
          <input id="search-bar" type={"text"} ref={cityRef} required />
          <i
           className='fa-solid fa-plus'
            id="search-icon"
            style={{backgroundColor:"",padding:'10px',borderRadius:'0 1rem 1rem 0'}}
            onClick={handleSubmit}
          ></i>
          {/* <img
            src={farienheiticon}
            alt="search"
            className={`temp-icon ${units === "metric" ? `inactive` : ``}`}
            id="temp-icon-farienheit"
            onClick={() => {
              setUnits("metric");
            }}
          /> */}
          {/* <img
            src={celsiusIcon}
            alt="search"
            className={`temp-icon ${units !== "metric" ? `inactive` : ``}`}
            id="temp-icon-celsius"
            onClick={() => {
              setUnits("standard");
            }}
          /> */}
        </div>
        </form>    
        <div className='locations'>
        {error.status? <div className='error'>{error.message}</div>
            :(
                data?
                (
                    !data.length?<div className='login' style={{margin:'auto',padding:"1rem"}}>No saved Locations!!!please add them here</div>:
                    data.map((i)=>(<FavouriteCard {...i} removeLocation={removeLocation}></FavouriteCard>))
                )
                :
                (
                <div className='loader' style={{width:"100vw",justifyContent:"center"}}>
                <RingLoader></RingLoader>
                <p className="loading">loading...</p>
                </div>
                )
            )}          
        </div>
        </section>
    )
}