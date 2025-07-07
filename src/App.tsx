import React from 'react';
import { Terminal } from 'lucide-react';
import HashGenerator from './components/HashGenerator';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col p-4 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between mb-4 border-b border-green-700 pb-2">
        <div className="flex items-center">
          <Terminal className="w-6 h-6 mr-2 text-green-400" />
          <h1 className="text-2xl font-bold text-green-400">Hack Hash DidiHub</h1>
        </div>
        <div className="text-sm text-green-300 animate-pulse">
          v1.0.2_alpha
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <HashGenerator />
      </main>
      
      {/* Footer */}
      <footer className="text-xs text-green-700 mt-4 flex justify-between border-t border-green-900 pt-2">
        <div>Sec.Level: MAXIMUM</div>
        <div>© 2025 DidiHub Operations</div>
        <div className="animate-pulse">Connection: SECURE</div>
      </footer>
    </div>
  );
}

export default App;