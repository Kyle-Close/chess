// router.tsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../components/AppWrapper.tsx";
import { Play } from "base/pages/Play.tsx";
import { Landing } from "base/pages/Landing.tsx";
import { LocalConfiguration } from "base/pages/LocalConfiguration.tsx";
import { StockfishConfiguration } from "base/pages/StockfishConfiguration.tsx";

export const router = createBrowserRouter(
  [
    {
      // One shared shell so the nav and providers persist across pages
      element: <App><Outlet /></App>,
      children: [
        { path: "/", element: <Landing /> },
        { path: "/configure/local", element: <LocalConfiguration /> },
        { path: "/configure/stockfish", element: <StockfishConfiguration /> },
        { path: "/play/:gameId", element: <Play /> },
      ],
    },
  ],
  {
    basename: "/chess",   // <-- IMPORTANT for GitHub Pages
  }
);
