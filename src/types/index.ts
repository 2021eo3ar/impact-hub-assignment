export interface Game {
  id: string;
  name: string;
  entryCoins: number;
  players: number;
  description?: string;
}

export interface Transaction {
  type: 'recharge' | 'deduct';
  amount: number;
  date: number;
  gameId?: string;
  gameName?: string;
}

export interface WalletData {
  balance: number;
  history: Transaction[];
}

export type RechargePack = 'small' | 'medium' | 'large';

export interface WalletContextType {
  balance: number;
  history: Transaction[];
  games: Game[];
  loading: boolean;
  gameLoadingStates: Record<string, boolean>;
  rechargeLoadingStates: Record<RechargePack, boolean>;
  error: string | null;
  currentGame: Game | null;
  handleRecharge: (pack: RechargePack) => Promise<void>;
  handleJoinGame: (game: Game) => Promise<void>;
  handleLeaveGame: () => void;
}