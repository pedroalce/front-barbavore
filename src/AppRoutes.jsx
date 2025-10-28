import React, { Suspense, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login"));
const ClientDashboard = React.lazy(() => import("./components/Dashboard/ClientDashboard"));
const BarberDashboard = React.lazy(() => import("./components/Dashboard/BarberDashboard"));
const Profile = React.lazy(() => import("./components/Profile"));
const Clients = React.lazy(() => import("./components/Clients"));
const Settings = React.lazy(() => import("./components/Settings"));
const AppointmentDetails = React.lazy(() => import("./components/AppointmentDetails"));

function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext) ?? {};
    if (loading) return <div>Carregando...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

function NotFound() {
    return (
        <div>
            <h2>Página não encontrada</h2>
            <div>Verifique a URL ou retorne à página inicial.</div>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
                <Route path="/barber" element={<ProtectedRoute><BarberDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/appointments/:id" element={<ProtectedRoute><AppointmentDetails /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
