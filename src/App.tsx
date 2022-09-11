import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import TitleContent from './entities/TitleContent';
import TypeContent from './entities/TypeContent';
import PageLayout from './layouts/PageLayout';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/anime" />} />
        <Route path="/anime" element={<TypeContent />} />
        <Route path="/anime/:mal_id" element={<TitleContent />} />
        <Route path="/manga" element={<TypeContent />} />
        <Route path="/manga/:mal_id" element={<TitleContent />} />
        <Route path="/user:id" element={<div>profile</div>} />
      </Routes>
    </PageLayout>
  );
}

export default App;
