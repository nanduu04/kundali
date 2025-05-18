import React from 'react';
import './App.css';

// Components
import Header from './components/Header';
import KundliCalculator from './components/KundliCalculator';

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Add Font Awesome icons to library
library.add(fas, fab);

function App() {
  return (
    <div className="App bg-background text-textDark font-sans">
      <Header />
      <main className="min-h-screen py-8">
        <KundliCalculator />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} KundliCast - Check your Kundli for free</p>
      </footer>
    </div>
  );
}

export default App;
