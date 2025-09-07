import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IoLocationSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { GiModernCity, GiMountainRoad, GiIsland, GiPagoda, GiPalmTree } from "react-icons/gi";

const SearchBar = ({ onSearch, inputRef }) => {
  // ---------- STATE ----------
  const [isFocused, setIsFocused] = useState(false); // Quản lý trạng thái input focus
  const [activeTab, setActiveTab] = useState("popular"); // Tab đang active: 'popular' hoặc 'recent'

  // ---------- DATA ----------
  // Danh sách các thành phố phổ biến kèm icon và vùng miền
  const popularCities = [
    { name: "Hà Nội", region: "Thủ đô", icon: GiModernCity },
    { name: "Hồ Chí Minh", region: "Miền Nam", icon: GiModernCity },
    { name: "Đà Nẵng", region: "Miền Trung", icon: GiPalmTree },
    { name: "Huế", region: "Miền Trung", icon: GiPagoda },
    { name: "Nha Trang", region: "Miền Trung", icon: GiIsland },
    { name: "Đà Lạt", region: "Tây Nguyên", icon: GiMountainRoad },
    { name: "Sapa", region: "Miền Bắc", icon: GiMountainRoad },
    { name: "Hạ Long", region: "Miền Bắc", icon: GiIsland }
  ];

  // Danh sách các tìm kiếm gần đây
  const recentSearches = ["Phú Quốc", "Vũng Tàu", "Quy Nhơn", "Hội An"];

  // ---------- EVENT HANDLER ----------
  // Thực hiện search khi chọn location
  const handleSearch = (location) => {
    if (inputRef.current) {
      inputRef.current.value = location; // Điền giá trị vào input
      onSearch(); // Gọi callback search
      setIsFocused(false); // Ẩn dropdown
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto relative z-50">
      {/* ---------- Input + Buttons Container ---------- */}
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <div className={`
          relative flex items-center gap-2 p-2 
          bg-white/10 backdrop-blur-xl rounded-2xl
          border border-white/20 shadow-lg
          transition-all duration-300 ease-out
          ${isFocused ? "bg-white/20 scale-105" : ""}
        `}>
          
          {/* ---------- INPUT ---------- */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text" 
              placeholder="Tìm kiếm thành phố..."
              className="w-full bg-transparent px-4 py-3 text-lg text-white placeholder-white/70 outline-none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {/* Underline animation khi focus */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFocused ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 origin-left"
            />
          </div>

          {/* ---------- SEARCH BUTTON ---------- */}
          <button
            onClick={onSearch}
            className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 group"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* ---------- LOCATION BUTTON ---------- */}
          <button
            className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-300 group"
            onClick={() => {}}
          >
            <IoLocationSharp className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* ---------- DROPDOWN ---------- */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden"
            >
              {/* ---------- TAB SWITCH ---------- */}
              <div className="flex items-center gap-2 p-2">
                <button
                  onClick={() => setActiveTab("popular")}
                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
                            transition-all ${activeTab === "popular" ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <GiModernCity className="text-white" />
                  <span className="text-white">Phổ biến</span>
                </button>
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2
                            transition-all ${activeTab === "recent" ? "bg-white/20" : "hover:bg-white/10"}`}
                >
                  <FaHistory className="text-white" />
                  <span className="text-white">Gần đây</span>
                </button>
              </div>

              {/* ---------- LIST ITEMS ---------- */}
              <div className="p-2">
                {activeTab === "popular" ? (
                  <div className="grid grid-cols-2 gap-2">
                    {popularCities.map((city, index) => (
                      <motion.button
                        key={city.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(city.name)}
                        className="w-full px-4 py-3 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          {React.createElement(city.icon, {
                            className: "text-white/70 w-6 h-6 group-hover:scale-110 transition-transform"
                          })}
                          <div>
                            <div className="text-white font-medium">{city.name}</div>
                            <div className="text-white/70 text-sm">{city.region}</div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentSearches.map((location, index) => (
                      <motion.button
                        key={location}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(location)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-3"
                      >
                        <FaHistory className="text-white/70" />
                        {location}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchBar;
