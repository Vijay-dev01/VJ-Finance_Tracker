import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayoutBasic from './layouts/Dashboard';
import Sidebar from './global/Sidebar';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from './global/Topbar';
import { useState } from 'react';
import Register from './layouts/Register';
import { ToastContainer } from 'react-toastify';
import Login from './layouts/LogIn';
import { HelmetProvider } from 'react-helmet-async';
import ForgotPassword from './layouts/ForgotPassword';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
        <ToastContainer theme='dark'/>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                  <Route path='*' element={<DashboardLayoutBasic />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/password/forgot' element={<ForgotPassword />}></Route>

                </Routes>
              </main>
            </div>
          </ThemeProvider>
          </HelmetProvider>
        </ColorModeContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
