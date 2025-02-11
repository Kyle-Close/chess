import { createBrowserRouter } from "react-router-dom";
import App from '../components/App.tsx';
import { GameSetup } from "../components/game-setup/index.tsx";
import { Game } from "../components/game/index.tsx";

export const router = createBrowserRouter([
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
