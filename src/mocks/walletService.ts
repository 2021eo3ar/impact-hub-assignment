import { WalletData, RechargePack } from '../types';

let balance = 100;
let history: WalletData['history'] = [
  { type: 'recharge', amount: 100, date: Date.now() - 86400000 }, // 1 day ago
];

const RECHARGE_PACKS: Record<RechargePack, number> = {
  small: 50,
  medium: 100,
  large: 200,
};

export function fetchWallet(): Promise<WalletData> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ balance, history }), 300)
  );
}

export function recharge(pack: RechargePack): Promise<WalletData> {
  const amount = RECHARGE_PACKS[pack];
  return new Promise((resolve) =>
    setTimeout(() => {
      balance += amount;
      history.unshift({ 
        type: 'recharge', 
        amount, 
        date: Date.now() 
      });
      resolve({ balance, history });
    }, 300)
  );
}

export function joinGame(gameId: string, cost: number, gameName?: string): Promise<WalletData> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (balance < cost) {
        return reject(new Error('Insufficient balance'));
      }
      balance -= cost;
      history.unshift({ 
        type: 'deduct', 
        amount: cost, 
        date: Date.now(),
        gameId,
        gameName
      });
      resolve({ balance, history });
    }, 300)
  );
}