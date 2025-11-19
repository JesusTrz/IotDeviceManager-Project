import React from "react";
import "./css/NewDevice.css";
// ICONOS https://react-icons.github.io/react-icons/icons/hi2/
import { HiArrowLeft } from "react-icons/hi2";
import BtnAction from "../components/btn-action/BtnAction";

const NewDevice = () => {
  const volverAtras = () => {
    window.history.back();
  };

  return (
    <div className="new-device-container">
      <div className="header-new-device">
        <BtnAction onClick={volverAtras}>
          <HiArrowLeft size={30} />
        </BtnAction>
        <div className="subtitle-device">
          <h1>Nuevo Dispositivo</h1>
          <p>Configura un nuevo dispositivo.</p>
        </div>
      </div>

      <hr />

      <div className="new-device-form">

        <form action="#" method="post" className="form-device">
          <h3>Device</h3>
          <label htmlFor="device-name">Nombre del dispositivo</label>
          <input type="text" id="nombre" />
          <label htmlFor="device-status">Status</label>
          <select>
            <option value="HTML">Sin status</option>
            <option value="HTML">Activo</option>
            <option value="CSS">No Activo</option>
          </select>
          <label htmlFor="device-json">Configuracion</label>
          <textarea id="device-json" rows="10" />
          <BtnAction>Agregar</BtnAction>
        </form>
        
      </div>
    </div>
  );
};

export default NewDevice;
