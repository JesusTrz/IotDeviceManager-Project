import React from 'react'
import {Routes, Route} from 'react-router-dom'
// VISTA DE INICIO
import StartView from './views/StartView'

// VISTAS PREDETERMINADAS
import Dashboard from './views/Dashboard'

// VISTAS CRUD
import NewDevice from './views/NewDevice'
import EditDevice from './views/EditDevice'


function App() {
  return (
    <Routes>
      {/* RUTA INICIAL */}
      
      {/* RUTAS */}
      <Route path='/' element={<Dashboard />} />

      {/* VISTAS CRUD */}
      <Route path="/newDevice" element={<NewDevice />} />
      <Route path="/editDevice/:id" element={<EditDevice />} />

      {/* RUTAS NO ENCONTRADAS */} 
      <Route path="*" element={<h2>404 — No encontramos esa página</h2>} />
    </Routes>
  );
}

export default App