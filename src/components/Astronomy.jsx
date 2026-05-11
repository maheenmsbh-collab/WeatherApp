import { useEffect, useState } from "react";

function Astronomy({ cityName }) {
  const [astroData, setAstroData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cityName) return;

    async function fetchAstronomy() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.weatherapi.com/v1/astronomy.json?key=0e7f59624ed2437a93b160214251409&q=${cityName}`
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const data = await res.json();
        setAstroData(data?.astronomy?.astro);
      } catch (err) {
        setError(err.message);
        setAstroData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAstronomy();
  }, [cityName]);

  

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Loading astronomy info…
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

  if (!astroData) return null;

  

  return (
    <div className="h-56 flex flex-col items-center justify-center px-4">
      

    
      <h3 className="text-lg font-semibold text-center text-indigo-700 mb-3">
        Astronomy Details
      </h3>

    
      <div className="grid grid-cols-2 gap-y-2 w-full max-w-xs text-sm text-gray-700">
        <p className="font-medium">Sunrise</p>
        <p className="text-right">{astroData.sunrise}</p>

        <p className="font-medium">Sunset</p>
        <p className="text-right">{astroData.sunset}</p>

        <p className="font-medium">Moonrise</p>
        <p className="text-right">{astroData.moonrise}</p>

        <p className="font-medium">Moonset</p>
        <p className="text-right">{astroData.moonset}</p>

        <p className="font-medium">Moon Phase</p>
        <p className="text-right">{astroData.moon_phase}</p>
      </div>
    </div>
  );
}

export default Astronomy;
