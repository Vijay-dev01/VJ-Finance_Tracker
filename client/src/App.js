import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import LogIn from "./Authentication/LogIn";
import Navbar from "./components/Navbar";
import Register from "./Authentication/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer theme="dark" />
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Navbar />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
