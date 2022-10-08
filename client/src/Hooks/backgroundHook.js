// import {useState,useEffect} from 'react';

// export default function useBackground(main,date,initalState){
    
//     const [background,setBackground]=useState(initalState)
    
export default function changeBackground(main, status) {
      //   const temp = new Date(date);
        var k ;
        switch (main) {
          case "Thunderstorm":
                k = status === "night"
                ? "/images/thunderstorm-night.jpg"
                : "/images/thunderstorm-day.jpg";
            break;
          case "Drizzle":
                k = status === "night"
                ? "/images/drizzle-night.jpg"
                : "/images/drizzle-day.jpg";
          break;
          case "Rain":
                k = status === "night"
                ? "/images/rain-night.jpg"
                : "/images/rain-day.jpg";
          break;
          case "Snow":
                k = status === "night"
                ? "/images/snow-night.jpg"
                : "/images/snow-day.jpg";
          break;
          case "Clear":
                k = status === "night"
                ? "/images/clear-night.jpg"
                : "/images/clear-day.jpg";
          break;
          case "Clouds":
                k = status === "night"
                ? "/images/cloud-night.jpg"
                : "/images/clouds-day.jpg";
          break;
          case "Ash":
                k = status === "night"
                ? "/images/volcano-night.jpg"
                : "/images/volcano-day.jpg";
          break;
          case "Haze":
                k = status === "night"
                ? "/images/haze-day.jfif"
                : "/images/haze-day.jfif";
          break;
          default:
                k = "/images/clear-day.jpg"
        }
        // setBackground(k)
        // return {background,setBackground}
        console.log(k)
        return k;
    };

//     return {background,setBackground}
// }