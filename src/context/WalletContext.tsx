import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { fetchWallet, recharge, joinGame } from "../mocks/walletService";
import { GAMES } from "../mocks/games";
import { Game, RechargePack, WalletContextType } from "../types";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [balance, setBalance] = useState<number>(0);
  const [history, setHistory] = useState<WalletContextType["history"]>([]);
  const [games] = useState<Game[]>(GAMES);
  const [loading, setLoading] = useState<boolean>(false);
  const [gameLoadingStates, setGameLoadingStates] = useState<
    Record<string, boolean>
  >({});
  const [rechargeLoadingStates, setRechargeLoadingStates] = useState<
    Record<RechargePack, boolean>
  >({
    small: false,
    medium: false,
    large: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchWallet()
      .then(({ balance, history }) => {
        setBalance(balance);
        setHistory(history);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleRecharge = async (pack: RechargePack): Promise<void> => {
    setRechargeLoadingStates((prev) => ({ ...prev, [pack]: true }));
    setError(null);
    try {
      const result = await recharge(pack);
      setBalance(result.balance);
      setHistory(result.history);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setRechargeLoadingStates((prev) => ({ ...prev, [pack]: false }));
    }
  };

  const handleJoinGame = async (game: Game): Promise<void> => {
    setGameLoadingStates((prev) => ({ ...prev, [game.id]: true }));
    setError(null);
    try {
      const result = await joinGame(game.id, game.entryCoins, game.name);
      setBalance(result.balance);
      setHistory(result.history);
      setCurrentGame(game);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setGameLoadingStates((prev) => ({ ...prev, [game.id]: false }));
    }
  };

  const handleLeaveGame = (): void => {
    setCurrentGame(null);
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        history,
        games,
        loading,
        gameLoadingStates,
        rechargeLoadingStates,
        error,
        currentGame,
        handleRecharge,
        handleJoinGame,
        handleLeaveGame,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
