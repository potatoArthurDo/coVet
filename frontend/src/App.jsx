import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Pets from "./pages/Pets";
import Demo from "./pages/Demo"
import Shop from "./pages/Shop";
import PetDetails from "./pages/PetDetails";
import Appointment from "./pages/Appointment";
import ResultDetail from "./pages/ResultDetail";
import ProfileCreate from "./components/Profile-create";
import Profile from "./pages/Profile";
import Instruction from "./pages/Instruction";
import ChangePassword from "./pages/ChangePassword";
// import 'bootstrap/dist/css/bootstrap.min.css';


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogOut() {
  localStorage.clear();
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogOut />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              {" "}
              <Pets />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/demo"
          element={
            <ProtectedRoute>
              {" "}
              <Demo /> {" "}
            </ProtectedRoute>
          }
        />

        <Route path="/shop" element={<Shop/>} />
        {/* <Route  path="/detail/:id" element={<PetDetails />}/>
        <Route path ="/appointment" element={<Appointment />} /> */}

        <Route
          path="/pets/:id"
          element={
            <ProtectedRoute>
              {" "}
              <PetDetails /> {" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <ProtectedRoute>
              {" "}
              <Appointment /> {" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/result/:id"
          element={
            <ProtectedRoute>
              {" "}
              <ResultDetail/> {" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {" "}
              <Profile/> {" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <ProtectedRoute>
              {" "}
              <ChangePassword /> {" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
