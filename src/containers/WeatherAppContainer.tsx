import { useState, useEffect, useMemo } from 'react'
import WeatherInfo from '../components/weatherInfo'
import axios from 'axios'
import { ENVIRONMENT } from '../evn'
import { IWeatherInfo, weatherUnit } from '../types/weatherTypes'
import CitiesInput from '../components/CitiesInput'

function WeatherAppContainer() {
    //useState lazy initialization for first render
    const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | void>(() => checkLocation());
    const [weatherData, setWeatherData] = useState<IWeatherInfo>();
    const [units, setUnits] = useState<weatherUnit>("metric");
    const [city, setcity] = useState<string>("");

    useEffect(() => {
        if (city) {
            getWeatherWithCityName(city, units).then(resp => setWeatherData(resp));
            return;
        }
        if (!currentLocation) return;
        getWeatherWithCords(currentLocation.coords.latitude, currentLocation.coords.longitude, units).then(resp => setWeatherData(resp));
    }, [currentLocation, units, city])

    
    const getTempUnit = useMemo(() => {
        switch (units) {
            case "standard":
                return "°K";
            case "metric":
                return "°C";
            case "imperial":
                return "°F";
        }
    }, [units])

    const getSpeedUnit = useMemo(() => {
        switch (units) {
            case "standard":
                return "°m/s";
            case "metric":
                return "m/s";
            case "imperial":
                return "ft/s";
        }
    }, [units])

    function checkLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((resp) => setCurrentLocation(resp));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function getWeatherWithCords(lat: number, lon: number, units: weatherUnit): Promise<IWeatherInfo> {
        const response = axios.get(ENVIRONMENT.apiUrl, {params: {lat: lat, lon: lon, units: units, appid: ENVIRONMENT.apiKey}}).then((resp) => resp.data);
        return response;
    }
    
    function getWeatherWithCityName(city: string, units: weatherUnit): Promise<IWeatherInfo> {
        const response = axios.get(ENVIRONMENT.apiUrl, {params: {q: city, units: units, appid: ENVIRONMENT.apiKey}}).then((resp) => resp.data);
        return response;
    }

  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex items-center justify-center sm:min-w-[640px]'>
            <div className='absolute top-6'>
                <CitiesInput updateCity={setcity}/>
            </div>
            <div className='absolute top-0 left-0'>
                    <select value={units} onChange={(event) => setUnits(event.target.value as weatherUnit)}>
                        <option value="standard">standard</option>
                        <option value="metric">metric</option>
                        <option value="imperial">imperial</option>
                    </select>
                </div>
            <div className='w-full'>
                <WeatherInfo data={weatherData!} tempUnit={getTempUnit} speedUnits={getSpeedUnit}/>
            </div>
        </div>
    </div>
  )
}

export default WeatherAppContainer