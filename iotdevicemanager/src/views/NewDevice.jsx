import React, { useState } from "react";
import "./css/NewDevice.css";

import { HiArrowLeft, HiCpuChip } from "react-icons/hi2";
import BtnAction from "../components/btn-action/BtnAction";
import BtnActionUser from "../components/btn-action/BtnActionUser";

import { useNavigate } from "react-router-dom";

// API
import { addDevice } from "../api/devicesApi";

const NewDevice = () => {
  const navigate = useNavigate();

  const volverAtras = () => {
    window.history.back();
  };

  // JSON BASE DEL FORMULARIO

   // Json Base
  const baseConfig = {
    IntervaloEnvio: 5,
    Unidad: "Celsius",
    UmbralAlerta: 30
  };

  // ESTADOS DEL FORMULARIO
  const [newDevice, setNewDevice] = useState({
    macAddress: "",
    name: "",
    status: "En Linea",
    currentConfigJson: JSON.stringify(baseConfig, null, 2),
  });

  // Cambio de inputs
  const handleChange = (e) => {
    setNewDevice({
      ...newDevice,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!newDevice.name.trim()) {
      return alert("El nombre del dispositivo es obligatorio.");
    }

    if (!newDevice.currentConfigJson.trim()) {
      return alert("Debes ingresar un JSON de configuración.");
    }

    try {
      // Enviar a la API
      await addDevice(newDevice);

      alert("Dispositivo creado correctamente.");

      // Volver al dashboard
      navigate("/");
    } catch (error) {
      console.error("Error al crear dispositivo:", error);
      alert("Hubo un error al crear el dispositivo.");
    }
  };

  return (
    <div className="new-device-container">
      <div className="header-new-device">
        <BtnAction onClick={volverAtras}>
          <HiArrowLeft size={30} style={{backgroundColor:"transparent"}} />
        </BtnAction>

        <div className="subtitle-device">
          <h1>Nuevo Dispositivo</h1>
          <p>Configura un nuevo dispositivo.</p>
        </div>
      </div>

      <hr />

      <div className="new-device-form">
        <h2>Nuevo dispositivo</h2>

        <form onSubmit={handleSubmit} className="add-device-form">
          <label>Nombre del Dispositivo:</label>
          <input
            type="text"
            name="name"
            value={newDevice.name}
            onChange={handleChange}
          />

          <label>MacAddress:</label>
          <input 
          type="text"
          name="macAddress"
          value={newDevice.macAddress}
          onChange={handleChange} />

          <label>Status:</label>
          <select
            name="status"
            value={newDevice.status}
            onChange={handleChange}
          >
            <option value="En Linea">En Linea</option>
            <option value="Fuera de Linea">Fuera de Linea</option>
          </select>

          <label>Configuración (JSON):</label>
          <textarea
            name="currentConfigJson"
            value={newDevice.currentConfigJson}
            onChange={handleChange}
          ></textarea>

          <BtnActionUser type="submit">
            <HiCpuChip size={20} style={{ paddingRight: "10px", backgroundColor:"transparent" }} />
            Agregar Dispositivo
          </BtnActionUser>
        </form>
      </div>
    </div>
  );
};

export default NewDevice;
