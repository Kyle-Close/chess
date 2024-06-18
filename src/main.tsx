import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BoardProvider } from './context/board/BoardContext.tsx';
import { GameStateProvider } from './context/game-state/GameState.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BoardProvider>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </BoardProvider>
  </React.StrictMode>
);
