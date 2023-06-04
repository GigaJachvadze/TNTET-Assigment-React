export type weatherUnit = "standard" | "metric" | "imperial";

export interface IWeatherInfo {
    coord: coords
    weather: weather[]
    base: string,
    main: weatherMain
    visibility: number,
    wind: weatherWind,
    rain: rain,
    clouds: clouds,
    dt: number,
    sys: weatherSys,
    timezone: number,
    id: number,
    name: string,
    cod: number
}

interface coords {
    lon: number,
    lat: number
}

interface weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface weatherMain {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

interface weatherWind {
    speed: number,
    deg: number,
    gust: number
}

interface rain {
    "1h": number
}

interface clouds {
    all: number
}

interface weatherSys {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}