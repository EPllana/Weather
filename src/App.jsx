import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherBox from './components/WeatherBox/WeatherBox';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
function App() {
    const [weatherData, setWeatherData] = useState(null)
    const [disabledButton, setDisabledButton] = useState(false)
    //Create an apiKey in openWeatherMap in: https://openweathermap.org/, and use it below
    const apiKey = '1a73c4dd721b1bd044d10e4b85456e0f';

    const onFormSubmit = (event) => {
        event.preventDefault();
        setDisabledButton(true)
        console.log(event.target)
        //Get value from input and set to city const
        const city = event.target[0].value
        //Set value of input to empty string
        event.target[0].value = ''
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            //axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}`)
            .then(response => {
                console.log(response.data);
                //Get lat and long of entered city
                const lat = response.data.coord.lat;
                const lon = response.data.coord.lon;

                let weatherObject = {
                    name: response.data.name,
                    temp: response.data.main.temp,
                    temp_min: response.data.main.temp_min,
                    temp_max: response.data.main.temp_max,
                    humidity: response.data.main.humidity,
                    image: response.data.weather[0],
                    //set dummy data
                    next_days: [
                        {
                            day: 'Monday',
                            temp: 20
                        },
                        {
                            day: 'Tuesday',
                            temp: 21
                        },
                        {
                            day: 'Wednesday',
                            temp: 18
                        },
                        {
                            day: 'Thursday',
                            temp: 24
                        },
                        {
                            day: 'Friday',
                            temp: 22
                        },
                        {
                            day: 'Saturday',
                            temp: 21
                        },
                        {
                            day: 'Sunday',
                            temp: 20
                        }

                    ]
                }
                //Get other data with lat and long 
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                    .then(responseData => {
                        console.log(responseData);
                        //spread weatherObject and added list key with data from responseData
                        weatherObject = {
                            ...weatherObject,
                            list: responseData.data.list
                        }
                        //set the new data with setWeatherData
                        setWeatherData(weatherObject);
                        //set disabledButton value to false
                        setDisabledButton(false)
                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
            .catch(error => {
                console.log(error);
            });
    }
    
    
    useEffect(() => {
        //Make request only the first render
        // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1a73c4dd721b1bd044d10e4b85456e0f`)
        //     .then(response => {
        //         console.log(response.data);
        //         setWeatherData(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

    }, [])
    // setTimeout(() => {
    //     setWeatherData('London')
    // }, 5000);
    return (
        <>
            <div className='weather-wrapper'>
                <div className='header'>
                    <div className="container">
                        <div className="form-holder">

                            <form id="form" onSubmit={onFormSubmit}>
                                <input type="text" className='input' name="city" placeholder='Enter city...' />
                                <button type='submit' className='button' disabled={disabledButton}>Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    //conditional rendering, if weatherData is not null, then render below
                    weatherData !== null ?
                        <div className="container">
                            <img src={`https://openweathermap.org/img/wn/${weatherData.image.icon}@2x.png`} className='weather-image' />
                            <h1>{weatherData.name}</h1>
                            <h2>{weatherData.temp}&#176;</h2>
                            <p className='description'>Min: {weatherData.temp_min}&#176; - Max: {weatherData.temp_max}&#176; - Humidity: {weatherData.humidity}%</p>
                            <div className="weather-box">
                                <h3>Dummy Data</h3>
                                <div className='weather-box-holder'>
                                    {
                                        weatherData.next_days.map((item, i) => {
                                            console.log(item);
                                            return (<WeatherBox day={item.day} temp={item.temp} key={i} />)
                                        })
                                    }
                                </div>
                            </div>
                            <div className="weather-box">
                                {
                                    weatherData.list.map((item, i) => {
                                        return (<WeatherInfo data={item} key={i} />)
                                    })
                                }

                            </div>
                        </div>
                        :
                        ''

                }
                {disabledButton
                    ?
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    : ''
                }
            </div>
        </>
    )
}

export default App
