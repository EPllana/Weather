/* eslint-disable react/prop-types */
const WeatherBox = (props) => {
    console.log(props)
    return(
        <div className="weather-item">
            <h3>{props.day}</h3>
            <p>{props.temp}&#176;</p>
        </div>
    )
}
export default WeatherBox