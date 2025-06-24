import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import CreateEvent from "./components/CreateEvent";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./admin/AdminPanel";
import AdminRoute from "./admin/AdminRoute";
import ManageUsers from "./admin/ManageUsers";
import EditEvent from "./components/EditEvent";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import MyRSVPList from "./components/MyRSVPList";
import Chat from './components/Chat'; // path to Chat.jsx


const App = () => {
  return (
    <>
      <Navbar />
      {
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/edit/:id" element={<EditEvent />} />
          <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/events/:id/rsvps" element={<MyRSVPList />} />   {/* Admin */}
          <Route path="/myrsvps" element={<MyRSVPList />} />            {/* User */}
            <Route path="/chat" element={<Chat />} />
            

          {/* Protect admin route */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

        </Routes>
      }
    </>
  );
};

export default App;
