import { createBrowserRouter } from "react-router-dom";
import App from '../components/AppWrapper.tsx';
import { ChessApi } from "base/pages/ChessApi.tsx";
import { Play } from "base/pages/Play.tsx";
import { Landing } from "base/pages/Landing.tsx";
import { LocalConfiguration } from "base/pages/LocalConfiguration.tsx";
import { StockfishConfiguration } from "base/pages/StockfishConfiguration.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App>
        <Landing />
      </App>),
  },
  {
    path: '/configure/local',
    element: (
      <App>
        <LocalConfiguration />
      </App>),
  },
  {
    path: '/configure/stockfish',
    element: (
      <App>
        <StockfishConfiguration />
      </App>),
  },

  {
    path: '/chess-api',
    element: (
      <App>
        <ChessApi />
      </App>
    ),
  },
  {
    path: '/play/:gameId',
    element: (
      <App>
        <Play />
      </App>
    ),
  },
]);
