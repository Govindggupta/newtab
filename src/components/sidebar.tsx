'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onBackgroundChange: (background: string) => void;
  currentBackground: string;
}

export default function Sidebar({ isOpen, onClose, onBackgroundChange, currentBackground }: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Background image options
  const backgroundOptions = [
    '/wp6819375.jpg',
    '/8904441.jpg',
    '/5992037.jpg',
    '/1727068108.jpg',
    '/2962268.jpg'
  ];

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

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('themeChanged'));
  }, [isDarkMode]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onBackgroundChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefault = () => {
    onBackgroundChange('/wp6819375.jpg');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleImageClick = (imagePath: string) => {
    onBackgroundChange(imagePath);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-80 h-screen backdrop-blur-md z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDarkMode 
            ? 'bg-black/80 text-white shadow-2xl shadow-black/50' 
            : 'bg-white/90 text-gray-800 shadow-2xl shadow-gray-200/50'
          }
        `}
        style={{ padding: '80px 20px 20px 20px' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`
            absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-110
            ${isDarkMode 
              ? 'text-white/70 hover:text-white hover:bg-white/10' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }
          `}
          title="Close sidebar"
        >
          <X size={20} />
        </button>

        <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Background Settings
        </h2>
        
        {/* Theme Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
              {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </span>
            <button
              onClick={toggleTheme}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isDarkMode 
                  ? 'bg-blue-600 focus:ring-blue-500' 
                  : 'bg-gray-200 focus:ring-gray-500'
                }
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                  ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {/* Background Image Options */}
        <div className="mb-6">
          <label className={`block mb-3 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
            Choose Background
          </label>
          <div className="grid grid-cols-2 gap-3">
            {backgroundOptions.map((imagePath, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(imagePath)}
                className={`
                  relative w-full h-20 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 overflow-hidden border-2
                  ${currentBackground === imagePath 
                    ? 'border-blue-500 shadow-lg' 
                    : isDarkMode 
                      ? 'border-white/20 hover:border-white/40' 
                      : 'border-gray-200 hover:border-gray-400'
                  }
                `}
                style={{
                  backgroundImage: `url(${imagePath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay for better visibility */}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-200" />
                
                {/* Check mark for selected image */}
                {currentBackground === imagePath && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Background Upload */}
        <div className="mb-6">
          <label className={`block mb-3 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>
            Upload New Background
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className={`
              w-full p-3 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
              ${isDarkMode 
                ? 'border-gray-500 bg-gray-800/50 text-white hover:border-gray-400' 
                : 'border-gray-300 bg-gray-50 text-gray-800 hover:border-gray-400'
              }
            `}
          />
        </div>

        {/* Reset Button */}
        <div className="mb-6">
          <button
            onClick={resetToDefault}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold transition-all duration-200 hover:bg-blue-600 hover:scale-105"
          >
            Reset to Default Background
          </button>
        </div>

        {/* Note */}
        <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          <p><strong>Note:</strong> Your background preference will be saved locally on this device.</p>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}
    </>
  );
}
