'use client';

import { useState, useEffect } from 'react';

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

  const sidebarStyles = {
    position: 'fixed' as const,
    top: 0,
    left: isOpen ? 0 : '-300px',
    width: '300px',
    height: '100vh',
    background: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 999,
    transition: 'left 0.3s ease',
    padding: '80px 20px 20px 20px',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
    color: isDarkMode ? '#ffffff' : '#333333'
  };

  const titleStyles = {
    marginBottom: '20px',
    color: isDarkMode ? '#ffffff' : '#333333',
    fontSize: '18px',
    fontWeight: 'bold'
  };

  const labelStyles = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: isDarkMode ? '#cccccc' : '#555555'
  };

  const inputStyles = {
    width: '100%',
    padding: '10px',
    border: `2px dashed ${isDarkMode ? '#555' : '#ccc'}`,
    borderRadius: '8px',
    background: isDarkMode ? '#2a2a2a' : '#f9f9f9',
    cursor: 'pointer',
    color: isDarkMode ? '#ffffff' : '#333333'
  };

  const buttonStyles = {
    width: '100%',
    padding: '12px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
    marginBottom: '10px'
  };

  const themeButtonStyles = {
    ...buttonStyles,
    background: isDarkMode ? '#6c757d' : '#28a745'
  };

  const noteStyles = {
    fontSize: '12px',
    color: isDarkMode ? '#aaaaaa' : '#666666',
    lineHeight: '1.4'
  };

  return (
    <>
      {/* Sidebar */}
      <div style={sidebarStyles}>
        <h2 style={titleStyles}>Background Settings</h2>
        
        {/* Theme Toggle */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={toggleTheme}
            style={themeButtonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDarkMode ? '#5a6268' : '#218838';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDarkMode ? '#6c757d' : '#28a745';
            }}
          >
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        {/* Background Upload */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyles}>
            Upload New Background
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={inputStyles}
          />
        </div>

        {/* Reset Button */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={resetToDefault}
            style={buttonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0056b3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#007bff';
            }}
          >
            Reset to Default Background
          </button>
        </div>

        {/* Note */}
        <div style={noteStyles}>
          <p><strong>Note:</strong> Your background preference will be saved locally on this device.</p>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 998,
            background: 'rgba(0, 0, 0, 0.3)'
          }}
        />
      )}
    </>
  );
}
