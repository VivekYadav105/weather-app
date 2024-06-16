import React, { useCallback, useEffect, useState } from 'react'
import './favcard.css'

import images from '../../images'

function FavouriteCard(props){

    const [cardValue,setCardValue] = useState({
        background:images[props.status]||images['Clear'],
        color:'white'
    }) 

    function setBackground(){
        setCardValue((i)=>(
        {...i,background:images[props.status]}
    ))}

    
    return(
        <section className='card-wrapper'>
            <div className='favourite-card' style={{backgroundImage:`url(${cardValue.background})`}}>
                <div className='favourite-card-header'>
                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                        <button onClick={()=>props.removeLocation(props.place)} style={{backgroundColor:"#f05808",color:"white",borderRadius:10,padding:10,fontFamily:"Raleway"}} className='remove-btn'>
                            X
                        </button>
                    </div>
                    <span id='fav-temp'>{props.temperature}°c
                    </span>
                        <span id='fav-place'>{props.place}</span>
                </div>
                <div className='favourite-card-footer'>
                    <div className='fav-detail-mini'>
                    <i className="fa-solid fa-calendar-days"></i>
                        <span id='fav-time'>{props.date} | {props.time}</span>
                    </div>
                    <div className='fav-detail-mini'>
                        <i className='fa-solid fa-droplet'></i>
                        <span  id='fav-status'>{props.status>5?props.status:props.status.substring(0,5)+".."}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FavouriteCard;