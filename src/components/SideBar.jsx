import { useState } from "react";
import Forecast from "./Forecast";
import WeatherAlerts from "./WeatherAlerts";
import Astronomy from "./Astronomy";

function SideBar({ weather }) {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showAstro, setShowAstro] = useState(false);


  const forecastHeight = "h-60"; 

  return (
    <>
      
      <aside className="hidden md:flex flex-col rounded-lg w-80 bg-white/50 backdrop-blur-md shadow-lg p-6 border-r border-gray-200 mt-8 mr-2 ml-8 mb-10">
        <h2 className="mb-1 text-xl font-bold text-gray-800">
          Next Three Days Forecast.
        </h2>

        
        <div className={`overflow-y-auto mt-0  mb-4 ${forecastHeight} flex items-center justify-center`}>
          {weather ? (
            <Forecast cityName={weather.location.name} />
          ) : (
            
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <div className="text-gray-500 font-medium">Loading forecast...</div>
            
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          )}
        </div>

        
        <nav className="mt-4 space-y-4">
          <button
            onClick={() => setShowAlerts(true)}
            className="w-full py-3 px-2 h-15 bg-blue-700 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition"
          >
            Show Weather Alerts
          </button>

          <button
            onClick={() => setShowAstro(true)}
            className="w-full py-3 px-2 h-15 bg-blue-700 text-white rounded-lg font-medium shadow hover:bg-blue-600 transition"
          >
            Astronomy
          </button>
        </nav>
      </aside>

      
      {showAlerts && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg w-80 md:w-96 h-80 md:h-96 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Weather Alerts</h2>
              <button
                onClick={() => setShowAlerts(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
              >
                ❌
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {weather ? (
                <WeatherAlerts cityName={weather.location.name} />
              ) : (
                <p className="text-gray-600 text-center">No alerts available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      
      {showAstro && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl shadow-lg w-80 md:w-96 h-80 md:h-96 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Astronomy 🌇</h2>
              <button
                onClick={() => setShowAstro(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
              >
                ❌
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {weather ? (
                <Astronomy cityName={weather.location.name} />
              ) : (
                <p className="text-gray-600 text-center">
                  Astro not available right now...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
