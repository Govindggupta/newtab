'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Searchbar from '@/components/Searchbar';

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('/wp6819375.jpg');

  // Load background from localStorage on component mount
  useEffect(() => {
    const savedBackground = localStorage.getItem('backgroundImage');
    if (savedBackground) {
      setBackgroundImage(savedBackground);
    }
  }, []);

  // Save background to localStorage when it changes
  const handleBackgroundChange = (newBackground: string) => {
    setBackgroundImage(newBackground);
    localStorage.setItem('backgroundImage', newBackground);
  };

  return (
    <div 
      className="min-h-screen w-full m-0 p-0 relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-black/80 border-2 border-white/30 rounded-full cursor-pointer flex items-center justify-center shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-sm hover:scale-110 hover:bg-black/90 hover:border-white/60"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Search Component - Centered at top */}
      <div className="flex justify-center pt-20 px-4">
        <Searchbar />
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onBackgroundChange={handleBackgroundChange}
        currentBackground={backgroundImage}
      />
    </div>
  );
}