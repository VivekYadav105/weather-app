import './App.css';
import {Header,Footer} from './components/partials'
import {WeatherLive,WeatherHourly} from './components/weather'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const LocationContext = React.createContext({})

function App() {
  const [city, setCity] = useState(null);
  const [units, setUnits] = useState("standard");
  const ProviderValue = {
    city,units,setCity,setUnits
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <LocationContext.Provider value={ProviderValue}>
        <Route path='/' element={<WeatherLive/>}/>
        <Route path='/week' element={<WeatherWeek/>}/>
        <Route path='/saved' element={<SavedPlaces/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/map' element={<Map/>}></Route>
        </LocationContext.Provider>
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}
export {LocationContext}
export default App;
