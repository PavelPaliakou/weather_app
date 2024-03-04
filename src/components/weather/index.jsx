import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);

    const APIKey = "";

    useEffect(() => {
        fetchWeatherData("Berlin");
    }, [])

    async function fetchWeatherData(param) {
        setLoading(true);
        console.log(param);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${APIKey}`
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            if (!data) {
                throw new Error("No data found");
            }

            setWeatherData(data);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    function handleSearch() {
        fetchWeatherData(search);
    };

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch} />
            <div>
                {
                    loading
                        ? <div className="loading">Loading...</div>
                        : <div>
                            <div className="city-name">
                                <h2>
                                    {weatherData.name}, <span>{weatherData.sys.country}</span>
                                </h2>
                            </div>
                            <div className="date">
                                <span>{getCurrentDate()}</span>
                            </div>
                            <div className="temperature">
                                {weatherData.main.temp}
                            </div>
                            <p className="description">
                                {
                                    weatherData.weather[0]
                                        ? weatherData.weather[0].description
                                        : null
                                }
                            </p>
                            <div className="weather-info">
                                <div className="column">
                                    <div>
                                        <p className="wind">
                                            {weatherData.wind.speed}
                                        </p>
                                        <p>Wind speed</p>
                                    </div>
                                </div>
                                <div className="column">
                                    <div>
                                        <p className="humidity">
                                            {weatherData.main.humidity}%
                                        </p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                }
            </div>
        </div>
    )
}