import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import ProtectedRoute from "../userAuth/ProtectedRoute";
import AuthPage from "../userAuth/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: ":explore", element: <ExplorePage /> },
      { path: ":explore/:id", element: <DetailsPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },
  { path: "/auth", element: <AuthPage /> },
]);

export default router;
