import { Routes, Route } from "react-router-dom";
import ClientDashboard from "../components/Dashboard/ClientDashboard";
import BarberDashboard from "../components/Dashboard/BarberDashboard";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import Schedule from "../components/Agenda/Schedule";
import Profile from "../components/Profile";
import History from "../components/History";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<ClientDashboard />} />
      <Route path="/barber-dashboard" element={<BarberDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/agenda" element={<Schedule />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/historico" element={<History />} />
    </Routes>
  );
};

export default AppRoutes;