import { Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./pages/auth/Logout";
import ChangePassword from "./pages/auth/ChangePassword";
import CreateUser from "./pages/users/CreateUser";
import ListUser from "./pages/users/ListUser";
import ProfilUser from "./pages/users/ProfilUser";
import CreateAgence from "./pages/agences/CreateAgence";
import ListAgence from "./pages/agences/ListAgence";
import Init from "./pages/transfert/Init";
import ListTransfert from "./pages/transfert/ListTransfert";
import Historic from "./pages/transfert/Historic";
import HomeChef from "./pages/home/chef_agence/HomeChef";
import AddWorkStation from "./pages/workstation/AddWorkStation";
import ListWorkStation from "./pages/workstation/ListWorkStation";
import AssignPoste from "./pages/workstation/AssignPoste";
import AssignListing from "./pages/workstation/AssignListing";
import Connection from "./pages/whatsapp/Connection";

function App() {
  return (
    <Routes>
      <Route
        path="/gfa/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/user/create" element={<CreateUser />} />
              <Route path="/user/list" element={<ListUser />} />
              <Route path="/user/profil" element={<ProfilUser />} />
              <Route path="/agence/create" element={<CreateAgence />} />
              <Route path="/agence/list" element={<ListAgence />} />
              <Route path="/transfert/init" element={<Init />} />
              <Route path="/transfert/pending" element={<ListTransfert />} />
              <Route path="/transfert/historic" element={<Historic />} />
              <Route path="/home/chef_agence" element={<HomeChef />} />
              <Route
                path="/chef_agence/poste/create"
                element={<AddWorkStation />}
              />
              <Route
                path="/chef_agence/poste/liste"
                element={<ListWorkStation />}
              />
              <Route
                path="/chef_agence/user/poste/assign"
                element={<AssignPoste />}
              />
              <Route
                path="/chef_agence/user/poste/assign/list"
                element={<AssignListing />}
              />
              <Route path="/whatsapp" element={<Connection />} />
            </Routes>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />
      <Route path="/change/password" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
