// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/UI/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AllVendors from './components/AllVendors'; // ✅ use the new AllVendors component
import './i18n';
import AdminDashboard from './components/Admin/AdminDashboard'; // ✅ this must exist


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/vendor/register" element={<Register />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route path="/vendors" element={<AllVendors />} />
  <Route path="/admin" element={<AdminDashboard />} /> {/* ✅ Admin route */}
</Routes>

          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
