# Mini Social Gaming App

A modern, interactive gaming platform that combines multiplayer games with a comprehensive wallet system. Built with React, TypeScript, and Tailwind CSS, this application demonstrates advanced state management, real-time UI updates, and professional-grade user experience design.

## ✨ Features

### 🎮 Game Lobby

- **Interactive Game Selection**: Browse available games with detailed information
- **Real-time Player Counts**: View current active players for each game
- **Smart Entry Validation**: Automatic balance checking before game entry
- **Individual Loading States**: Precise feedback for each game join action

### 💰 Wallet System

- **Real-time Balance Tracking**: Live coin balance updates
- **Multiple Recharge Options**: Flexible coin purchase packages (50, 100, 200 coins)
- **Transaction History**: Complete audit trail of all wallet activities
- **Error Handling**: Comprehensive validation and user feedback

### 🎯 Game Experience

- **Immersive Game Screen**: Full-featured game interface with realistic flow
- **Dynamic Game States**: Seamless transitions between waiting, playing, and finished states
- **Interactive Timer**: Real-time countdown with formatted display
- **Professional Animations**: Smooth transitions and micro-interactions

## 🛠️ Tech Stack

### Frontend Framework

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable SVG icons
- **CSS Animations** - Custom animations and transitions

### State Management

- **React Context API** - Centralized state management for wallet and game data
- **Custom Hooks** - Reusable logic with `useWallet` hook

### Development Tools

- **ESLint** - Code linting with TypeScript support
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript Compiler** - Strict type checking and modern JS features

## 🚀 How to Run

### Prerequisites

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd impact-hub-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build production-ready application
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── GameLobby.tsx   # Game selection and lobby interface
│   ├── GameScreen.tsx  # In-game experience and interface
│   └── WalletPanel.tsx # Wallet management and transactions
├── context/            # React Context providers
│   └── WalletContext.tsx # Global state management
├── mocks/              # Mock data and services
│   ├── games.ts        # Game definitions and metadata
│   └── walletService.ts # Simulated API services
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎮 Available Games

### Challenge & Connect

- **Entry Cost**: 10 coins
- **Players**: 5 players per game
- **Description**: Strategic multiplayer challenges with social interaction

### Snake & Ladder

- **Entry Cost**: 15 coins
- **Players**: 2 players per game
- **Description**: Classic board game with modern digital enhancements

### Treasure Quest

- **Entry Cost**: 25 coins
- **Players**: 4 players per game
- **Description**: Adventure-based treasure hunting with team collaboration

## 💡 Key Features Demonstrated

### Advanced State Management

- **Context API Implementation**: Centralized state with TypeScript support
- **Individual Loading States**: Granular UI feedback for better UX
- **Error Boundary Handling**: Comprehensive error management

### Professional UI/UX

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Micro-interactions**: Subtle animations that enhance user engagement
- **Loading States**: Professional spinners and transition effects
- **Color Psychology**: Strategic use of colors for different actions

### Code Quality

- **TypeScript Integration**: Full type safety across the application
- **Component Modularity**: Reusable, maintainable component architecture
- **Clean Code Practices**: Consistent naming and organization

## 🔮 Future Enhancements

- **Real-time Multiplayer**: WebSocket integration for live gameplay
- **User Authentication**: Secure login and profile management
- **Payment Integration**: Real payment processing with Stripe/PayPal
- **Game Analytics**: Player statistics and performance tracking
- **Social Features**: Friend systems and chat functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

---

**Built with ❤️ using modern web technologies**
