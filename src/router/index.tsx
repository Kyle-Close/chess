import { createBrowserRouter } from "react-router-dom";
import App from '../components/AppWrapper.tsx';
import { ChessApi } from "base/pages/ChessApi.tsx";
import { Play } from "base/pages/Play.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    path: '/play',
    element: (
      <App>
        <Play />
      </App>
    ),
  },
]);
