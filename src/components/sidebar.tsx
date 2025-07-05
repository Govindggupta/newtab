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
          <button
            onClick={toggleTheme}
            className={`
              w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105
              ${isDarkMode 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-green-500 text-white hover:bg-green-600'
              }
            `}
          >
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
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
