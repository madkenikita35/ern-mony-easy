import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import the new page
import EmployerDash from "./pages/EmployerDash";
import PostJob from "./pages/PostJob";
import SeekerHome from "./pages/SeekerHome";
import ViewApplications from "./pages/ViewApplications";
import AdminDash from "./pages/AdminDash";
import MainHome from "./pages/MainHome";
import ProtectedRoute from "./pages/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute>
              <EmployerDash />
            </ProtectedRoute>
          }
        />
        <Route path="/post-job" element={<PostJob />} />
        <Route
          path="/seeker-home"
          element={
            <ProtectedRoute>
              <SeekerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-applications"
          element={
            <ProtectedRoute>
              <ViewApplications />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-dashboard" element={<AdminDash />} />
        <Route
          path="/main-home"
          element={
            <ProtectedRoute>
              <MainHome />
            </ProtectedRoute>
          }
        />
        // Inside your App.jsx Routes
        {/* <Route path="/view-applications" element={<EmployerInbox />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
