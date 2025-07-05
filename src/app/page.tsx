'use client';

import { useState, useEffect } from 'react';

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

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleBackgroundChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to default background
  const resetToDefault = () => {
    handleBackgroundChange('/wp6819375.jpg');
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative'
      }}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: isSidebarOpen ? 0 : '-300px',
          width: '300px',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          transition: 'left 0.3s ease',
          padding: '80px 20px 20px 20px',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Background Settings</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#555' }}>
            Upload New Background
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px dashed #ccc',
              borderRadius: '8px',
              background: '#f9f9f9',
              cursor: 'pointer'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={resetToDefault}
            style={{
              width: '100%',
              padding: '12px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background 0.3s ease'
            }}
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

        <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
          <p><strong>Note:</strong> Your background preference will be saved locally on this device.</p>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
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

      
    </div>
  );
}