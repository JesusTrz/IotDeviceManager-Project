import React from "react";
import "./BtnAction.css";

// 💡 Acepta 'onClick' y 'children' como props
function BtnAction({ onClick, children }) {
  return (
    <button
      className="btn-action"
      // Asigna la función 'onClick' recibida a la acción del botón
      onClick={onClick}
    >
      {/* Muestra el contenido ('children') pasado entre las etiquetas, 
          permitiendo cualquier texto o incluso un ícono */}
      {children}
    </button>
  );
}

export default BtnAction;
