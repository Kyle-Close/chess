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
import { BaseModal } from './components/generic/BaseModal.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseModal />,
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
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
