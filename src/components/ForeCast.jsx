import { useEffect, useState } from "react";

function Forecast({ cityName }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) {
      setError("No city selected");
      setLoading(false);
      return;
    }

    async function fetchForecast() {
      try {
        setLoading(true);
        console.log("Fetching forecast for:", cityName); 
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=0e7f59624ed2437a93b160214251409&q=${cityName}&days=3`
        );
        if (!res.ok) throw new Error("Failed to fetch forecast");

        const data = await res.json();
        console.log("Forecast data:", data); 
        setForecast(data.forecast.forecastday);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [cityName]);

  if (loading) return <p className="text-gray-600">Loading forecast...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!forecast) return <p>No forecast available</p>;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center  bg-white/70 rounded-lg p-3 shadow-sm border border-gray-200"
          >
            <p className="font-medium text-gray-700">
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <p className="text-lg font-bold mt-2 text-blue-700">
              {day.day.avgtemp_c}°C
            </p>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
              className="w-10 h-10 mt-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
