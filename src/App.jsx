import React, { useState } from 'react';
import Editor from './components/Editor/Editor.jsx';
import Preview from './components/Preview/Preview.jsx';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider.jsx';
import Auth from './components/Auth/Auth.jsx';
import { loadSEOConfig, saveSEOConfig, loadLayoutConfig } from './utils/localStorage.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [layoutConfig, setLayoutConfig] = useState(() => loadLayoutConfig() || []);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [seoConfig, setSeoConfig] = useState(() => loadSEOConfig() || {
    title: 'Landing Page Preview',
    description: '',
    ogImage: '',
  });
  const [themeConfig, setThemeConfig] = useState(null);

  function handleSEOChange(seo) {
    setSeoConfig(seo);
    saveSEOConfig(seo);
  }

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <ThemeProvider>
      <header
        style={{
          display: 'flex',
          backgroundColor: '#111827',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          fontFamily: 'system-ui, sans-serif',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Site Builder</h1>
        <nav>
          <button
            aria-label={isPreviewMode ? 'Switch to Editor mode' : 'Switch to Preview mode'}
            onClick={() => setIsPreviewMode((v) => !v)}
            style={{
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              marginRight: '1rem',
            }}
          >
            {isPreviewMode ? 'Back to Editor' : 'Preview'}
          </button>

          <button
            aria-label="Logout"
            onClick={() => setUser(null)}
            style={{
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: 'white',
            }}
          >
            Logout
          </button>
        </nav>
      </header>

      <div
        style={{
          height: 'calc(100vh - 56px)',
          overflow: 'auto',
          backgroundColor: isPreviewMode ? '#e0e7ff' : '#f9fafb',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {isPreviewMode ? (
          <Preview layout={layoutConfig} seo={seoConfig} />
        ) : (
          <Editor
            onLayoutChange={setLayoutConfig}
            onSEOChange={handleSEOChange}
            seoData={seoConfig}
            onThemeChange={setThemeConfig}
            themeData={themeConfig || { primary: '#0070f3', font: 'system-ui' }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
