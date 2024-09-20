import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard'; // Dashboard komponentini import qilish
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} /> {/* Asosiy sahifa */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard sahifasi */}
        </Routes>
    </BrowserRouter>
);
