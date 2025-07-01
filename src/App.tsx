import React from 'react';
import GameLobby from './components/GameLobby';
import GameScreen from './components/GameScreen';
import WalletPanel from './components/WalletPanel';
import { WalletProvider, useWallet } from './context/WalletContext';

function AppContent() {
  const { currentGame } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mini Social Gaming</h1>
          <p className="text-gray-600 text-lg">Connect, Play, and Win with Friends</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {currentGame ? <GameScreen /> : <GameLobby />}
          <WalletPanel />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;