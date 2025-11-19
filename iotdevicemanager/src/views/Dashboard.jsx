import React from "react";
import "./css/Dashboard.css";
// NAVEGACION
import { Link } from "react-router-dom"; 
// ICONOS
import { HiPlus } from "react-icons/hi2"; 
// COMPONENTES
import BtnAction from "../components/btn-action/BtnAction"

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header-dashboard">
        <h1>¡Bienvenido a IotMaganerDevices!</h1>
        <p>Administra y monitorea tus dispositivos IoT de manera eficiente.</p>
      </div>

      <hr />

      <div className="nav-container">
        <h2>Dispositivos</h2>

      <Link to={"/newDevice"} title="Agregar Nuevo Dispositivo">
        <BtnAction>
          <HiPlus size={20}/>
        </BtnAction>
      </Link>
      </div>

      <div className="devices-content">
        <h2>Lista de Dispositivos</h2>
      </div>
    </div>
  );
};

export default Dashboard;
