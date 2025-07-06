'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Auto-focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Listen for theme changes from sidebar
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
    };

    // Listen for storage events (when theme changes in another component)
    window.addEventListener('storage', handleThemeChange);
    
    // Also listen for custom theme change events
    const handleCustomThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
    };

    window.addEventListener('themeChanged', handleCustomThemeChange);
    
    // Poll for theme changes (fallback)
    const interval = setInterval(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' && !isDarkMode) {
        setIsDarkMode(true);
      } else if (savedTheme === 'light' && isDarkMode) {
        setIsDarkMode(false);
      }
    }, 100);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('themeChanged', handleCustomThemeChange);
      clearInterval(interval);
    };
  }, [isDarkMode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Check if it's a URL
      const isUrl = /^https?:\/\//.test(query) || /^www\./.test(query);
      
      if (isUrl) {
        // If it's a URL, navigate to it
        const url = query.startsWith('http') ? query : `https://${query}`;
        window.location.href = url;
      } else {
        // If it's not a URL, perform a Google search
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
      }
    }
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
          <div className={`absolute left-4 ${isDarkMode ? 'text-white/60' : 'text-gray-400'}`}>
            <Search size={20} />
          </div>

          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search Google or type a URL"
            className={`
              w-full pl-12 pr-4 py-4 text-lg bg-transparent outline-none transition-colors duration-200
              ${isDarkMode 
                ? 'text-white placeholder-white/50' 
                : 'text-gray-800 placeholder-gray-500'
              }
            `}
          />
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
                p-3 text-sm cursor-pointer transition-colors duration-200
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
    </div>
  );
}