import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";
import { ArrowLeft, Users, Trophy, Clock, Gamepad2 } from "lucide-react";

export default function GameScreen() {
  const { currentGame, handleLeaveGame } = useWallet();
  const [gameStatus, setGameStatus] = useState<
    "waiting" | "playing" | "finished"
  >("waiting");
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!currentGame) return;

    // Simulate game flow
    const timer = setTimeout(() => {
      setGameStatus("playing");
      setTimeLeft(120); // 2 minutes game time
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentGame]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus]);

  if (!currentGame) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLeaveGame}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <Gamepad2 className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">{currentGame.name}</h2>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="p-6">
        {gameStatus === "waiting" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Joining Game...
            </h3>
            <p className="text-gray-600">
              Finding other players and setting up the game
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>Waiting for {currentGame.players} players</span>
            </div>
          </div>
        )}

        {gameStatus === "playing" && (
          <div className="space-y-6">
            {/* Game Status */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-900">
                    Game in Progress
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{currentGame.players} players active</span>
                </div>
              </div>
            </div>

            {/* Mock Game Board */}
            <div className="bg-gray-100 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentGame.name === "Snake & Ladder" ? "🐍🪜" : "🎯🤝"}
                </h3>
                <p className="text-gray-600 mb-4">
                  Game simulation in progress...
                </p>
                <div className="flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Controls */}
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                Make Move
              </button>
              <button
                onClick={handleLeaveGame}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Leave Game
              </button>
            </div>
          </div>
        )}

        {gameStatus === "finished" && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Game Finished!
            </h3>
            <p className="text-gray-600 mb-6">
              Thanks for playing {currentGame.name}
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Game Result</p>
              <p className="text-lg font-semibold text-gray-900">
                You finished in 2nd place! 🥈
              </p>
              <p className="text-sm text-green-600 font-medium">
                +5 bonus coins earned
              </p>
            </div>
            <button
              onClick={handleLeaveGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Back to Lobby
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
