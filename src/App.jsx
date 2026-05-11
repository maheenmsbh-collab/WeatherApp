import { useEffect, useState } from "react";

import Details from "./components/Details";
import HourlyForecast from "./components/HourlyTemp";
import Forecast from "./components/Forecast";
import Search from "./components/search";
import getBackgroundImage from "./components/Background";
import SideBar from "./components/SideBar";


function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function fetchWeather(cityName) {
    try {
      setError("");
      setLoading(true);

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=0e7f59624ed2437a93b160214251409&q=${cityName}`
      );
      if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);

      const data = await response.json();
      setWeather(data);
      setHasSearched(true);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchWeather(search);
      setSearch("");
    }
  };

  useEffect(() => {
    fetchWeather("Karachi"); 
  }, []);

  return (
    <div
      className="min-h-screen transition-all duration-700 bg-cover bg-center"
      style={{
        backgroundImage: getBackgroundImage(
          weather?.current?.condition?.text,
          console.log("cond", weather?.current?.condition?.text)
        
        ),
      }}
    >
    
      <header className="w-full bg-blue-950 text-white shadow-lg">
        <div className="max-w-9xl h:4 mx-auto px-4 py-1">
          <Search
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </header>

     
      <div className="flex">
        <SideBar weather={weather} />

        <main className="flex-1 px-4 py-6">
          {error && <p className="text-center text-red-600">{error}</p>}
          {loading ? (
            <p className="text-center mt-4">Loading...</p>
          ) : weather ? (
            <>
              <div className="max-w-5xl mx-auto mt-2 bg-white/50 p-4 rounded-lg shadow-lg">
                <Details weather={weather} hasSearched={hasSearched} />
              </div>

              <div className="max-w-5xl mx-auto mt-4 bg-white/50 p-4 rounded-lg shadow-lg">
                <HourlyForecast cityName={weather.location.name} />
              </div>
            </>
          ) : (
            <p className="text-center mt-4">
              Search for a city to see weather details
            </p>
          )}
         
        </main>
      </div>
    </div>
  );
}

export default App;
