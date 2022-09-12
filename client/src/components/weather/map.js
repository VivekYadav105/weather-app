import { useState } from "react";
import { MapContainer,Marker,TileLayer,Popup } from "react-leaflet";

export default function MapComponent(props){

    const [layer,setLayer] = useState("temp_new");

    const APIkey = "3c69e44246ed2a47cfbeb82438bad733";

    return(
        <MapContainer>
            <TileLayer
            attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${APIkey}`}
            />
            <Marker>
                <Popup>{}</Popup>
            </Marker>
        </MapContainer>
    )
}