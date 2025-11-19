import React from 'react'
import './BtnActionUser.css'

function BtnActionUser({ onClick, children }) {
  return (
    <button
      className="btn-action-user"
      // Asigna la función 'onClick' recibida a la acción del botón
      onClick={onClick}
    >
      {/* Muestra el contenido ('children') pasado entre las etiquetas, 
          permitiendo cualquier texto o incluso un ícono */}
      {children}
    </button>
  )
}

export default BtnActionUser