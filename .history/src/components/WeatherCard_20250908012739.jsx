import React from "react";
import { motion } from "framer-motion";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";

const WeatherStat = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
    <Icon className="w-8 h-8 text-white" />
    <div>
      <div className="text-lg font-medium text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  </div>
);

const WeatherCard = ({ data, type }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-morphism rounded-xl p-8 shadow-lg"
    >
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-white">
          {data.name}, {data.sys?.country}
        </h2>
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative p-4"
        >
          <img 
            src={type.img} 
            alt={type.type}
            className="w-40 h-40 object-contain drop-shadow-2xl"
          />
        </motion.div>

        <div className="text-7xl font-bold text-white tracking-tighter">
          {Math.round(data.main?.temp)}°C
        </div>

        <div className="text-2xl font-medium text-white/90 bg-white/10 px-6 py-2 rounded-full">
          {type.type}
        </div>

        <div className="grid grid-cols-3 gap-4 w-full mt-4">
          <WeatherStat 
            icon={WiHumidity}
            value={`${data.main?.humidity}%`}
            label="Humidity"
          />
          <WeatherStat 
            icon={WiStrongWind}
            value={`${data.wind?.speed} m/s`}
            label="Wind"
          />
          <WeatherStat 
            icon={WiBarometer}
            value={`${data.main?.pressure} hPa`}
            label="Pressure"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
