import { useWallet } from "../context/WalletContext";
import {
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

const RECHARGE_OPTIONS = [
  {
    pack: "small" as const,
    amount: 50,
    label: "+50",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    pack: "medium" as const,
    amount: 100,
    label: "+100",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    pack: "large" as const,
    amount: 200,
    label: "+200",
    color: "bg-green-700 hover:bg-green-800",
  },
];

export default function WalletPanel() {
  const { balance, history, handleRecharge, rechargeLoadingStates, error } =
    useWallet();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Wallet</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Balance Display */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Current Balance</p>
            <p className="text-3xl font-bold text-green-600">{balance}</p>
            <p className="text-sm text-gray-500">coins</p>
          </div>
        </div>

        {/* Recharge Buttons */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Plus className="w-4 h-4 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Quick Recharge</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {RECHARGE_OPTIONS.map(({ pack, amount, label, color }) => {
              const isLoading = rechargeLoadingStates[pack];

              return (
                <button
                  key={pack}
                  onClick={() => handleRecharge(pack)}
                  disabled={isLoading}
                  className={`${color} text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md hover:transform hover:-translate-y-0.5 min-h-[36px] flex items-center justify-center`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    label
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Error: {error}</span>
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Recent Transactions
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                No transactions yet
              </p>
            ) : (
              history.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1 rounded-full ${
                        transaction.type === "recharge"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "recharge" ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.type === "recharge"
                          ? "Recharge"
                          : "Game Entry"}
                      </p>
                      {transaction.gameName && (
                        <p className="text-xs text-gray-500">
                          {transaction.gameName}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${
                      transaction.type === "recharge"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "recharge" ? "+" : "-"}
                    {transaction.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
