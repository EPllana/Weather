/* eslint-disable react/prop-types */

const WeatherInfo = (props) => {
    //desctructuring object
    const {data} = props
    console.log(data)
    return (
        <div className="weather-info">
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
            <span className="info">{data.dt_txt} - Temp: {data.main.temp}&#176; - Min: {data.main.temp_min}&#176; - Max: {data.main.temp_max}&#176; - Humidity: {data.main.humidity}%</span>
        </div>
    )
}

export default WeatherInfo