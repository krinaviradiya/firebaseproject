import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './component/SignUp.jsx';
import Login from './component/Login.jsx';
import Dashboard from './component/Dashboard.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
