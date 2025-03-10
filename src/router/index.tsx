import { createBrowserRouter } from "react-router-dom";
import App from '../components/AppWrapper.tsx';
import { GamePage } from "../pages/game/components/GamePage.tsx";
import { GameSetupPage } from "../pages/game-setup/index.tsx";
import { ChessAPI } from "base/pages/game/components/ChessAPI.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/setup',
    element: (
      <App>
        <GameSetupPage />
      </App>
    ),
  },
  {
    path: '/game',
    element: (
      <App>
        <GamePage />
      </App>
    ),
  },
  {
    path: '/chess-api',
    element: (
      <App>
        <ChessAPI />
      </App>
    ),
  },
]);
