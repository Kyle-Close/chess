import { createBrowserRouter } from "react-router-dom";
import App from '../components/AppWrapper.tsx';
import { ChessAPI } from "base/pages/game/components/ChessAPI.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
