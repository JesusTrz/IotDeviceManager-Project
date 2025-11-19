import React from 'react'
import {Routes, Route} from 'react-router-dom'
// VISTAS PREDETERMINADAS
import Dashboard from './views/Dashboard'

// VISTAS CRUD
import NewDevice from './views/NewDevice'


function App() {
  return (
    <Routes>
      {/* RUTAS */}
      <Route path='/' element={<Dashboard />} />


      {/* VISTAS CRUD */}
      <Route path="/newDevice" element={<NewDevice />} />

      {/* RUTAS NO ENCONTRADAS */} 
      <Route path="*" element={<h2>404 — No encontramos esa página</h2>} />
    </Routes>
  );
}

export default App