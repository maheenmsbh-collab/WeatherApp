import  { useEffect, useState } from "react";

function RainInfo({ cityName }) {
  const [rainData, setRainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cityName) return;

    async function fetchRainData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=0e7f59624ed2437a93b160214251409&q=${cityName}&days=1`
        );
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data = await res.json();
        console.log("dtaa",data)
        setRainData(data.forecast.forecastday[0].day);
      } catch (err) {
        setError(err.message);
        setRainData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRainData();
  }, [cityName]);

  if (loading) return <p className="text-center mt-4">Loading rain info...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!rainData) return null;

  return (
    <div className="max-w-5xl mx-auto mt-4 bg-white/50 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-blue-900 mb-2">
        🌧 Rain & Precipitation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
        
        <div className="p-3 bg-blue-100 rounded-lg">
          <p className="text-lg">
            Condition:{" "}
            <span className="font-medium">{rainData.condition.text}</span>
          </p>
        </div>

        
        <div className="p-3 bg-blue-100 rounded-lg">
          <p className="text-lg">
            ☔ Chance of Rain:{" "}
            <span className="font-medium">{rainData.daily_chance_of_rain}%</span>
          </p>
        </div>

        
        <div className="p-3 bg-blue-100 rounded-lg">
          <p className="text-lg">
            💧 Precipitation:{" "}
            <span className="font-medium">{rainData.totalprecip_mm} mm</span>{" "}
            (<span className="font-medium">{rainData.totalprecip_in} in</span>)
          </p>
        </div>
      </div>
    </div>
  );
}

export default RainInfo;
