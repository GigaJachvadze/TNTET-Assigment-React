import { IWeatherInfo } from "../types/weatherTypes"

function WeatherData(data: {data: IWeatherInfo, tempUnit: string, speedUnits: string}) {
    if (!data.data) return;

    return(
        <>
        <div className="flex flex-col bg-white rounded-xl shadow-2xl p-4">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl font-semibold">{data.data.name}</h1>
                <h2 className="text-2xl">{data.data.weather[0].description}</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-around">
                <div className="flex items-start">
                    <div>
                        <img src={"http://openweathermap.org/img/wn/"+ data.data.weather[0].icon +"@2x.png"} alt="weatherImg"/>
                    </div>
                    <div className="flex flex-col justify-start">
                        <p className="font-bold text-5xl">{data.data.main.temp} {data.tempUnit}</p>
                        <p>Feels Like: <b>{data.data.main.feels_like}</b> {data.tempUnit}</p>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <p className="p-2">Humidity: <b>{data.data.main.humidity}</b> %</p>
                    <hr className="h-px w-full bg-gray-300 border-0 dark:bg-gray-700"></hr>
                    <p className="p-2">Sea Level: <b>{data.data.main.pressure}</b> hPa</p>
                    <hr className="h-px w-full bg-gray-300 border-0 dark:bg-gray-700"></hr>
                    <p className="p-2">Wind Speed: <b>{data.data.wind.speed}</b> {data.speedUnits}</p>
                    <hr className="h-px w-full bg-gray-300 border-0 dark:bg-gray-700"></hr>
                    <p className="p-2">Visibility: <b>{data.data.visibility}</b></p>
                </div>
            </div>
        </div>
        </>
    )
}

export default WeatherData
