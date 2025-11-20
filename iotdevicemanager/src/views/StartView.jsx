import React from "react";
import "./css/StartView.css";

// RUTA
import { Link } from "react-router-dom";

const StartView = () => {
  return (
    <div className="startview-container">
      <div className="first-container">
          <h1>IotDeviceManager</h1>
          <p>
            Configuración remota, control de versiones y recuperación
            instantánea para edificios inteligentes.
          </p>
      </div>

      <div className="second-container">
        <h3>¿Qué es?</h3>
        <p>
          Esta plataforma permite a los administradores de edificios
          inteligentes tomar el control total de sus dispositivos IoT (sensores,
          cámaras y actuadores). Más que un simple panel de control, nuestro
          sistema garantiza la integridad de tu configuración mediante un
          sistema avanzado de historial.
        </p>
        <p>
          Gracias a la implementación del Patrón Memento, cada cambio es
          rastreable y reversible. ¿Un error en la configuración? Viaja en el
          tiempo a través de nuestra línea temporal y restaura versiones
          estables en segundos.
        </p>
      </div>
      <Link to={"/dashboard"}>
      <button className="btn-start">Ingresar</button>
      </Link>
    </div>
  );
};

export default StartView;
