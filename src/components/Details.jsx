function Details({ weather, hasSearched }) {
  if (!weather || !weather.location) {
    if (!hasSearched) return null;

    return (
      <p className="text-center">
        Details of the searched city not found
      </p>
    );
  }

  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-4 text-blue-950">
        {weather.location.name}, {weather.location.country}
      </h2>

      <div className="bg-amber-500 p-4 h-15 rounded-lg text-center font-medium text-lg text-white flex items-center justify-center gap-4">
        <p className="mb-0">Description: {weather.current.condition.text}</p>
        <img
          src={`https:${weather.current.condition.icon}`}
          alt="Weather icon"
          className="w-16 h-16 object-contain drop-shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-white p-4 rounded-lg h-45 text-center transform transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-100">
          <p className="font-semibold mb-2 text-blue-950 text-2xl">Temperature</p>
          <p className="text-lg">{weather.current.temp_c}°C</p>
          <p className="text-lg">{weather.current.temp_f}°F</p>
          <p className="text-lg mt-2">Feels Like: {weather.current.feelslike_c}°C</p>
        </div>

        <div className="bg-white p-4 rounded-lg text-center transform transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-100">
          <p className="font-semibold mb-2 text-blue-950 text-2xl">Humidity</p>
          <p className="text-xl mt-3">{weather.current.humidity}%</p>
        </div>

        <div className="bg-white p-4 rounded-lg text-center transform transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-100">
          <p className="font-semibold mb-2 text-blue-950 text-2xl">Wind</p>
          <p className="mt-2">Speed: {weather.current.wind_kph} kph</p>
          <p className="mt-3">Direction: {weather.current.wind_dir}</p>
          <p className="mt-3">Degree: {weather.current.wind_degree}°</p>
        </div>
      </div>
    </>
  );
}

export default Details;
