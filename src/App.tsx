import { Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./pages/auth/Logout";
import ListSubscripActif from "./pages/subscription/ListSubscripActif";
import ListActif from "./pages/prospect/ListActif";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/subscription/actif"
                element={<ListSubscripActif />}
              />
              <Route path="/prospect/actif" element={<ListActif />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
