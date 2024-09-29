import { useEffect,useState } from 'react'
import { CountryInfo } from './types';
import { WeatherInfo } from './types/index';
import { fetchCountries, fetchCountryInfo, fetchWeather } from './services/countriesService';


function App() {
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountryInfo[]>(countries);
  const [input, setInput] = useState("");
  const [data, setData] = useState<CountryInfo | null>(null);
  const [weather, setWeather] = useState<WeatherInfo|null>(null);
  const [icon, setIcon] = useState<string|null>(null);
  
  const handleShow = (country: CountryInfo) => {

    setInput(country.name.common);
    setData(country);
  }

  useEffect(()=>{
    fetchCountries().then((response)=>
      setCountries(response)
    )
  },[]);

  useEffect(() => {
    setFilteredCountries(countries.filter((c) => c?.name.common.toLowerCase().includes(input.toLowerCase())))
  }, [countries, input]);

  useEffect(()=>{
      if(data?.name.common !== input){
        setData(null)
        setWeather(null)
        setIcon(null)
      }

    async function fetchDetailData() {
      if (filteredCountries.length === 1 && filteredCountries.find((c) => c?.name.common === input)) {
        const response = await fetchCountryInfo(input);
        setData(response);
        if(response.capital[0] === 'Washington, D.C.'){
          console.log(`in`);
          response.capital[0]= 'Washington DC';
        }
        const formattedCapital = response.capital[0].split(' ').join('+');
        console.log(formattedCapital);
        const weatherResponse = await fetchWeather(formattedCapital);
        setWeather(weatherResponse);
        setIcon(`https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`);
    
      }
    }
    fetchDetailData();
  }, [data?.name.common, filteredCountries, input])
 
  


  return (
    <>
      Search for country: <input type="text" name="country" value={input} onChange={(e)=> setInput(e.target.value) } />
      {input.length>0&&filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
      {!data && filteredCountries.length < 10 && filteredCountries.map((country) => <p key={country.name.common}>{country.name.common} <button onClick={()=> handleShow(country)}>Show</button></p>)}
      {data?.name.common == input &&
        <div>
          <h2>{data.name.common}</h2>
          <p>Capital: {data.capital}</p>
          <p>Area: {data.area}</p>
          <h3>languages</h3>
          <ul>
           {Object.entries(data.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))} 
          </ul>
          
          <img src={data.flags.png} alt={data.flags.alt} />

          <h3>Weather in {data.capital}</h3>
          <p>temperature: {weather?.main.temp} Fahrenheit</p>
          <img src={icon!} alt={weather?.weather[0].description} />
          <p>wind speed: {weather?.wind.speed} mph</p>
        </div>}
    </>
  )
}

export default App
