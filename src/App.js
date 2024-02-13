import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Game from "./components/Game";
import LeaderBoard from "./components/LeaderBoard";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
