import { createBrowserRouter } from "react-router-dom";
import App from '../components/AppWrapper.tsx';
import { ChessApi } from "base/pages/ChessApi.tsx";
import { Play } from "base/pages/Play.tsx";
import { Landing } from "base/pages/Landing.tsx";
import { Configuration } from "base/pages/Configuration.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App>
        <Landing />
      </App>),
  },
  {
    path: '/configure',
    element: (
      <App>
        <Configuration />
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
    path: '/play',
    element: (
      <App>
        <Play />
      </App>
    ),
  },
]);
