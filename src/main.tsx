import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GameSetup } from './components/game-setup/index.tsx';
import { Game } from './components/game/index.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { io } from 'socket.io-client';

import { extendTheme } from '@chakra-ui/react';
import '@fontsource/caveat';

export const socket = io('http://localhost:3000');

socket.on('connect', () => {
  socket.emit('difficulty', '1');
});

socket.on('bestmove', (message) => {
  console.log('Best Move:', message);
});

const theme = extendTheme({
  fonts: {
    heading: `'Caveat'`,
  },
});

export default theme;

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
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
