import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const Api_key = "8957db5e68d7db266d77c41b9c4033f5";

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState("from-blue-500 to-purple-600");

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
      gradient: "from-yellow-400 to-blue-500"
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
      gradient: "from-gray-400 to-blue-800"
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
      gradient: "from-blue-100 to-blue-400"
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
      gradient: "from-gray-300 to-blue-600"
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
      gradient: "from-gray-400 to-gray-700"
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
      gradient: "from-gray-500 to-gray-800"
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
      gradient: "from-gray-300 to-blue-400"
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
      gradient: "from-blue-300 to-blue-600"
    },
  ];

  useEffect(() => {
    if (showWeather && showWeather[0]) {
      const weatherType = WeatherTypes.find(w => w.type === showWeather[0].type);
      if (weatherType) {
        setBackgroundClass(weatherType.gradient);
      }
    }
  }, [showWeather, WeatherTypes]);

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      
      setApiData(null);
      if (data.cod === 404 || data.cod === 400) {
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ]);
      } else {
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        setApiData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} 
                    transition-all duration-1000 ease-out
                    relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, scale: 1 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bg-white rounded-full w-4 h-4 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-start pt-12 pb-8 px-4 gap-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white text-center
                   drop-shadow-lg"
        >
          Weather Forecast
        </motion.h1>

        <SearchBar onSearch={fetchWeather} inputRef={inputRef} />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center my-8"
            >
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-pulse" />
                <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin" />
              </div>
            </motion.div>
          ) : (
            showWeather && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-2xl mx-auto px-4"
              >
                <WeatherCard data={apiData} type={showWeather[0]} />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
