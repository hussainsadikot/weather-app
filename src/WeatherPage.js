import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./WeatherPage.css"
import "./Dsc.css"
import { FaArrowDown,FaArrowUp,FaWind } from "react-icons/fa"
import { BiHappy } from "react-icons/bi"
import { MdCompress,MdOutlineWaterDrop } from "react-icons/md"
function WeatherPage() {
    const { cityId } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [units,setUnits]=useState('metric')
    const tempUnit= units==='metric'?'°C':'°F'
    const windUnit=units==='metric'?'m/s':'m/h'
    const [iconUrl,setIconUrl]=useState(null)
    const API_KEY = '834967e54e58c24b14b931c9115d2d4d';
    const [cards, setCards] = useState([]);
    



    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            console.log("hello")
            console.log(data)
            setWeatherData(data);
            const iconCode = data.weather[0].icon;
            const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            setIconUrl(url);
            const neewCards=[
                {
                    id: 1,
                    icon: <FaArrowDown />,
                    title: "min",
                    data: data.main.temp_min.toFixed(),
                    unit: tempUnit,
                },
                {
                    id: 2,
                    icon: <FaArrowUp />,
                    title: "max",
                    data: data.main.temp_max.toFixed(),
                    unit: tempUnit,
                },
                {
                    id: 3,
                    icon: <BiHappy />,
                    title: "feels like",
                    data: data.main.feels_like.toFixed(),
                    unit: tempUnit,
                },
                {
                    id: 4,
                    icon: <MdCompress />,
                    title: "pressure",
                    data: data.main.pressure.toFixed(),
                    unit: "hPa",
                },
                {
                    id: 5,
                    icon: <MdOutlineWaterDrop />,
                    title: "humidity",
                    data: data.main.humidity.toFixed(),
                    unit: "%",
                },
                {
                    id: 6,
                    icon: <FaWind />,
                    title: "wind speed",
                    data: data.wind.speed.toFixed(),
                    unit: windUnit,
                },
            ];
            setCards(neewCards)

    
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        }
    };
    useEffect(() => {

        fetchWeatherData();
        

    }, [cityId, API_KEY]); // Ensure useEffect runs when cityId or API_KEY changes
    
    return (
        //     <div>
        //     {/* Weather information for the city */}
        //     <h1>Weather Page for City ID: {cityId}</h1>
        //   </div>
        <div className='wpbg' style={{ backgroundImage: `url($coldBg)` }}>
            <div className='overlay'>
                {
                    weatherData && (
                        <div className='container'>
                    <div className='section section_temprature'>
                        <div className='icon'>
                            <h3>{`${weatherData.name}, ${weatherData.sys.country}`}</h3>
                            <img src={iconUrl} alt='weaterIcon'></img>
                            <h3>{weatherData.weather[0].main}</h3>
                        </div>

                        <div className='temprature'>
                            <h1>{Math.round(weatherData.main.temp)}°C</h1>
                        </div>
                    </div>

                    {/* decription grid */}

                    <div className='sectionD section_descriptions'>
                    {cards && cards.length > 0 &&cards.map((card) => (
                                <div key={card.id} className='card'>
                                    <div className='description_card-icon'>
                                        {card.icon}
                                        <small>{card.title}</small>
                                    </div>
                                    <div>
                                        <h2>{card.data}
                                        
                                        {card.unit}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                    )
                }
                

            </div>
            {/* <h1>Weather Page</h1>
            {weatherData ? (
                <div>
                    <h2>Weather for {weatherData.name}</h2>
                    <p>Temperature: {Math.floor(weatherData.main.temp)}°C</p>
                    <p>Weather Description: {weatherData.weather[0].description}</p>
                    <p>Humidity: {Math.floor(weatherData.main.humidity)}%</p>
                    <p>Wind Speed: {Math.floor(weatherData.wind.speed)} m/s</p>
                    <p>Atmospheric Pressure: {weatherData.main.pressure} hPa</p>




                </div>
            ) : (
                <p>Loading weather data...</p>
            )} */}
        </div>
    );
}

export default WeatherPage;
