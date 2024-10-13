import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Layouts/LandingPage";
import { HelmetProvider } from 'react-helmet-async';
import LogIn from "./Authentication/LogIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer theme="dark" />
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
