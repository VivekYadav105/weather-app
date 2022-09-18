// import {useState,useEffect} from 'react';

// export default function useBackground(main,date,initalState){
    
//     const [background,setBackground]=useState(initalState)
    
export default function changeBackground(main, date) {
        const temp = new Date(date);
        var k ;
        switch (main) {
          case "Thunderstorm":
                k = temp.dayStatus() === "night"
                ? "./images/thunderstorm-night.jpg"
                : "./images/thunderstorm-day.jpg";
            break;
          case "Drizzle":
                k = temp.dayStatus() === "night"
                ? "./images/drizzle-night.jpg"
                : "./images/drizzle-day.jpg";
          break;
          case "Rain":
                k = temp.dayStatus() === "night"
                ? "./images/rain-night.jpg"
                : "./images/rain-day.jpg";
          break;
          case "Snow":
                k = temp.dayStatus() === "night"
                ? "./images/snow-night.jpg"
                : "./images/snow-day.jpg";
          break;
          case "Clear":
                k = temp.dayStatus() === "night"
                ? "./images/clear-night.jpg"
                : "./images/clear-day.jpg";
          break;
          case "Clouds":
                k = temp.dayStatus() === "night"
                ? "./images/clouds-night.jpg"
                : "./images/clouds-day.jpg";
          break;
          case "Ash":
                k = temp.dayStatus() === "night"
                ? "./images/volcano-night.jpg"
                : "./images/volcano-day.jpg";
          break;
          case "Haze":
                k = temp.dayStatus() === "night"
                ? "./images/haze-day.jfif"
                : "./images/haze-day.jfif";
          break;
          default:
                k = "./images/clear-day.jpg"
        }
        // setBackground(k)
        // return {background,setBackground}
        return k;
    };

//     return {background,setBackground}
// }