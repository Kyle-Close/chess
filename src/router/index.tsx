import { createBrowserRouter } from "react-router-dom";
import App from '../components/AppWrapper.tsx';
import { ChessApi } from "base/pages/ChessApi.tsx";

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
]);
