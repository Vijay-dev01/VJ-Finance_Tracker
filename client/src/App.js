import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import LogIn from "./Authentication/LogIn";
import Navbar from "./components/Navbar";
import Register from "./Authentication/Register";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/user/ResetPassword";
import ForgotPassword from "./components/user/ForgotPassword";
import HomeScreen from "./components/HomeScreen";
import Dashboard from "./scenes/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer theme="dark" />
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Navbar />}></Route>
            <Route path="/homescreen" element={<HomeScreen />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path='/myprofile' element={<ProtectedRoute> <Profile /></ProtectedRoute>}></Route>
            <Route path='/myprofile/update' element={<ProtectedRoute> <UpdateProfile /></ProtectedRoute>}></Route>
            <Route path='/myprofile/update/password' element={<ProtectedRoute> <UpdatePassword /></ProtectedRoute>}></Route>
            <Route path='/password/forgot' element={ <ForgotPassword />}></Route>
            <Route path='/password/reset/:token' element={ <ResetPassword />}></Route>
            <Route path='/dashboard' element={ <Dashboard />}></Route>
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
