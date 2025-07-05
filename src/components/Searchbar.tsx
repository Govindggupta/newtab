'use client';

import { useState, useEffect } from 'react';
import { Search, Mic, Camera } from 'lucide-react';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
    };

    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Perform search - you can customize this
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleVoiceSearch = () => {
    // Voice search functionality - you can implement speech recognition here
    console.log('Voice search clicked');
  };

  const handleImageSearch = () => {
    // Image search functionality
    console.log('Image search clicked');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div 
          className={`
            relative flex items-center w-full rounded-full border-2 transition-all duration-300 ease-in-out
            ${isDarkMode 
              ? 'bg-white/10 border-white/20 backdrop-blur-md shadow-lg shadow-black/20' 
              : 'bg-white/80 border-gray-200 backdrop-blur-md shadow-lg shadow-gray-200/50'
            }
            ${isFocused 
              ? isDarkMode 
                ? 'border-white/40 shadow-xl shadow-black/30' 
                : 'border-blue-400 shadow-xl shadow-blue-200/50'
              : ''
            }
          `}
        >
          {/* Search Icon */}
          <div className="absolute left-4 text-gray-400">
            <Search size={20} />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search Google or type a URL"
            className={`
              w-full pl-12 pr-20 py-4 text-lg bg-transparent outline-none placeholder-gray-400
              ${isDarkMode ? 'text-white' : 'text-gray-800'}
            `}
          />

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`
              absolute right-16 p-2 rounded-full transition-all duration-200 hover:scale-110
              ${isDarkMode 
                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }
            `}
            title="Search by voice"
          >
            <Mic size={20} />
          </button>

          {/* Image Search Button */}
          <button
            type="button"
            onClick={handleImageSearch}
            className={`
              absolute right-4 p-2 rounded-full transition-all duration-200 hover:scale-110
              ${isDarkMode 
                ? 'text-white/70 hover:text-white hover:bg-white/10' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }
            `}
            title="Search by image"
          >
            <Camera size={20} />
          </button>
        </div>

        {/* Search Suggestions (optional) */}
        {isFocused && query && (
          <div 
            className={`
              absolute top-full left-0 right-0 mt-2 rounded-lg border transition-all duration-200
              ${isDarkMode 
                ? 'bg-white/10 border-white/20 backdrop-blur-md shadow-lg' 
                : 'bg-white/90 border-gray-200 backdrop-blur-md shadow-lg'
              }
            `}
          >
            <div 
              className={`
                p-3 text-sm cursor-pointer hover:bg-opacity-20 transition-colors
                ${isDarkMode 
                  ? 'text-white/80 hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              🔍 Search for "{query}"
            </div>
          </div>
        )}
      </form>

      {/* Quick Actions */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105
            ${isDarkMode 
              ? 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white' 
              : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }
          `}
        >
          I'm Feeling Lucky
        </button>
        <button
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105
            ${isDarkMode 
              ? 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white' 
              : 'bg-white/60 text-gray-700 hover:bg-white/80'
            }
          `}
        >
          Google Search
        </button>
      </div>
    </div>
  );
}