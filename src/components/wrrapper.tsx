import { useState, useEffect } from 'react'
import WeatherData from './weatherInfo'
import axios from 'axios'
import { ENVIRONMENT } from '../evn'
import { IWeatherInfo, weatherUnit } from '../types/weatherTypes'
import cities from 'cities.json';

function Wrapper() {
    const [currentLocation, updateCurrentLocation] = useState<GeolocationPosition>();
    const [weatherData, updateWeatherData] = useState<IWeatherInfo>();
    const [units, updateUnits] = useState<weatherUnit>("metric");
    const [city, updatecity] = useState<string>("");

    useEffect(() => {
        checkLocation();
    }, [])

    useEffect(() => {
        if (city) {
            getWeatherWithCityName(city, units).then(resp => updateWeatherData(resp));
            return;
        }
        if (!currentLocation) return;
        getWeatherWithCords(currentLocation.coords.latitude, currentLocation.coords.longitude, units).then(resp => updateWeatherData(resp));
    }, [currentLocation, units, city])

    function checkLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((resp) => updateCurrentLocation(resp));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


  return (
    <>
    <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center justify-center sm:min-w-[640px]'>
            <div className='absolute top-6'>
                <GetCitiesWithFillter updateCity={updatecity}/>
            </div>
            <div className='absolute top-0 left-0'>
                    <select value={units} onChange={(event) => updateUnits(event.target.value as weatherUnit)}>
                        <option value="standard">standard</option>
                        <option value="metric">metric</option>
                        <option value="imperial">imperial</option>
                    </select>
                </div>
            <div className='w-full'>
                <WeatherData data={weatherData!} tempUnit={units == 'standard'? "°K" : units == 'metric'? "°C" : "°F"} speedUnits={units == 'standard'? "°m/s" : units == 'metric'? "m/s" : "ft/s"}/>
            </div>
        </div>
    </div>
    </>
  )
}

function GetCitiesWithFillter(prop: any) {
    const [fillter, updateFillter] = useState<string>("");
    const [list, updateList] = useState<any[]>([])

    let allCities = (cities as Array<any>)

    useEffect(() => {
        console.log(fillter)
        if (!fillter) {
            updateList([]);
            return;
        }
        let temp = allCities.filter((city: any) => (city.name).toLowerCase().startsWith((fillter).toLowerCase()));
        updateList(temp);
    }, [fillter])

    function handleClick(city: string): void {
        prop.updateCity(city);
        updateFillter("");
    }

    return (
        <div className='flex items-center justify-center'>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onFocus={(event: any) => {updateFillter(event.target.value)}} onBlur={() => updateFillter("")} onChange={(event: any) => updateFillter(event.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search City" required/>
                <div className='max-h-36 overflow-hidden absolute bg-white w-full' >
                    {
                        list.map((city: any, i: number) => <div className='h-6 cursor-pointer hover:bg-slate-400' key={i} onClick={() => handleClick(city.name)}>{city.name}</div>)
                    }
                </div>
            </div>
        </div>
    )
}

function getWeatherWithCords(lat: any, lon: any, units: weatherUnit): Promise<IWeatherInfo> {
    let response = axios.get(ENVIRONMENT.apiUrl, {params: {lat: lat, lon: lon, units: units, appid: ENVIRONMENT.apiKey}}).then((resp) => resp.data);
    return response;
}

async function getWeatherWithCityName(city: string, units: weatherUnit): Promise<any> {
    let response = axios.get(ENVIRONMENT.apiUrl, {params: {q: city, units: units, appid: ENVIRONMENT.apiKey}}).then((resp) => resp.data);
    return response;
}

export default Wrapper