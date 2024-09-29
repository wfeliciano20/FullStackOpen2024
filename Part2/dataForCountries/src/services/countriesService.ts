import axios from "axios";
import { CountryInfo, WeatherInfo } from "../types";

const countryInfoURL = `https://studies.cs.helsinki.fi/restcountries/api/name/`;
const countriesURL= `https://studies.cs.helsinki.fi/restcountries/api/all`
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=`
const api_key = import.meta.env.VITE_API_KEY;


export const fetchCountries = async (): Promise<CountryInfo[]> => {
    const response = await axios.get(countriesURL);
    return response.data;
}

export const fetchCountryInfo = async (countryName: string): Promise<CountryInfo> => {
    const response = await axios.get(`${countryInfoURL}${countryName}`);
    return response.data;
}

export const fetchWeather = async (capital: string): Promise<WeatherInfo> => {
    
    const response = await axios.get(`${weatherURL}${capital}&units=imperial&appid=${api_key}`);
    return response.data;
}

