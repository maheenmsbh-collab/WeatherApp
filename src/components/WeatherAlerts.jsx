import { useEffect, useState } from "react";

function WeatherAlerts({ cityName }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    async function fetchAlerts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=0e7f59624ed2437a93b160214251409&q=${cityName}&days=1&alerts=yes`
        );

        if (!res.ok) throw new Error("Failed to fetch weather alerts");

        const data = await res.json();
        setAlerts(data?.alerts?.alert ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, [cityName]);

  

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Checking for weather alerts…
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="h-35 flex flex-col items-center justify-center text-center px-8">
        <div className="text-4xl mb-3">🌤️</div>
        <p className="text-green-700 font-medium">
          No weather warnings
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Conditions are normal in {cityName}
        </p>
      </div>
    );
  }

  

  const alert = alerts[0];

  const isSevere =
    alert.event?.toLowerCase().includes("storm") ||
    alert.event?.toLowerCase().includes("warning") ||
    alert.event?.toLowerCase().includes("cyclone");

  return (
    <div className="h-full flex items-center justify-center px-6">
      <div
        className={`w-full max-w-sm rounded-xl p-5 shadow-inner border
        ${isSevere ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}
      >
        
        <div className="text-3xl mb-2 text-center">
          {isSevere ? "⛈️" : "⚠️"}
        </div>

        
        <h3
          className={`text-base font-semibold text-center mb-2
          ${isSevere ? "text-red-700" : "text-yellow-700"}`}
        >
          {alert.event}
        </h3>

        
        <p className="text-sm text-gray-700 text-center leading-relaxed">
          {alert.headline}
        </p>
      </div>
    </div>
  );
}

export default WeatherAlerts;
