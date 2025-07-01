import { useWallet } from "../context/WalletContext";
import { Users, Coins, Gamepad2 } from "lucide-react";

export default function GameLobby() {
  const { games, handleJoinGame, gameLoadingStates, balance } = useWallet();

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Game Lobby</h2>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {games.map((game) => {
          const canJoin = balance >= game.entryCoins;
          const isLoading = gameLoadingStates[game.id] || false;

          return (
            <div
              key={game.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {game.name}
                  </h3>
                  {game.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {game.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4" />
                      <span>{game.entryCoins} coins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{game.players} players</span>
                    </div>
                  </div>
                </div>

                <button
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 min-w-[120px] ${
                    canJoin && !isLoading
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={isLoading || !canJoin}
                  onClick={() => handleJoinGame(game)}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </div>
                  ) : !canJoin ? (
                    "Insufficient Coins"
                  ) : (
                    "Join Game"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
