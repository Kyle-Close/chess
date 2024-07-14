import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BoardProvider } from './context/board/BoardContext.tsx';
import { GameStateProvider } from './context/game-state/GameState.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GameSetup } from './components/game-setup/index.tsx';
import { Game } from './components/game/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/setup',
    element: (
      <App>
        <GameSetup />
      </App>
    ),
  },
  {
    path: '/game',
    element: (
      <App>
        <Game />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BoardProvider>
        <GameStateProvider>
          <RouterProvider router={router}></RouterProvider>
        </GameStateProvider>
      </BoardProvider>
    </ChakraProvider>
  </React.StrictMode>
);
