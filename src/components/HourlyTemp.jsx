import { useEffect, useState } from "react";

function HourlyForecast({ cityName }) {
  const [hoursTemp, setHoursTemp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cityName) return;

    async function fetchHourly() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=0e7f59624ed2437a93b160214251409&q=${cityName}&days=1`
        );
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        console.log("hour data",data)
        setHoursTemp(data.forecast.forecastday[0].hour);

      } catch (err) {
        setError(err.message);
        setHoursTemp([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHourly();
  }, [cityName]);

  if (loading) return <p className="text-center ">Loading hourly forecast...</p>;
  if (error) return <p >Error: {error}</p>;
  if (!hoursTemp) return <p>No hourly data available</p>;

  return (
    <div className=" bg-blue-50 p-4 rounded-lg  max-w-5xl h-67 ">
      <h3 className="text-xl font-semibold mb-3 text-center">Hourly Forecast</h3>
      <div className="flex space-x-5 overflow-x-auto pb-2">
        {hoursTemp.map((hourData) => (
          <div
            key={hourData.time}
            className="flex-shrink-0 w-36 h-44 bg-white rounded-lg p-3 text-center shadow mb-2 "
          >
            <p className="text-sm font-medium mb-3">{hourData.time}</p>
            <p className="text-xl font-bold mt-5">{hourData.temp_c}°C</p>
            <p className="text-lg text-blue-950 mt-4">{hourData.condition.text}</p>
            
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
