import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import { useSignalR } from "../context/SignalRContext";
import { deleteDevice, getAllDevices, sendDeviceSms } from "../api/devicesApi";

import { Link } from "react-router-dom";

import { HiPlus, HiWrench, HiTrash, HiChatBubbleBottomCenterText } from "react-icons/hi2";

import BtnActionUser from "../components/btn-action/BtnActionUser";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);

  const { connection, mensajes } = useSignalR();

  useEffect(() => {
    // 1. Cargar dispositivos (Esto está bien)
    getAllDevices()
      .then((res) => {
        console.log("Dispositivos obtenidos:", res.data);
        setDevices(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener dispositivos:", err);
      });

    // 2. Configurar SignalR (Solo si existe la conexión)
    if (connection) {
      const handleCambioEstado = (update) => {
        console.log("Status Cambiado: ", update);
        setDevices((prevDevices) =>
          prevDevices.map((d) =>
            d.id === update.id ? { ...d, status: update.status } : d
          )
        );
      };

      // Nos suscribimos al evento
      connection.on("CambioEstado", handleCambioEstado);

      // 3. LIMPIEZA: Nos desuscribimos si el componente muere o la conexión cambia
      return () => {
        connection.off("CambioEstado", handleCambioEstado);
      };
    }
  }, [connection]); // 👈 ¡IMPORTANTE! Agregamos 'connection' aquí

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este dispositivo?"
    );
    if (!confirmed) return;

    try {
      await deleteDevice(id);
      const response = await getAllDevices();
      setDevices(response.data);
      alert("Dispositivo eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el dispositivo:", error);
      alert("Hubo un error al eliminar el dispositivo.");
    }
  };

  // funcion de sendgrid
  const handleSendSms = async (id) => {
    const phoneNumber = prompt("Ingresa tu número (con lada, ej: +521122334455):");

    if(!phoneNumber) return; // Se cancela ai no se hace nada

    try {
      await sendDeviceSms(id, phoneNumber);
      alert("¡SMS Enviado con éxito!");
    } catch (error) {
      console.error("Error SMS: ", error);
      alert("Error al enviar el SMS.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header-dashboard">
        <h1>¡Bienvenido a IotMaganerDevices!</h1>
        <p>Administra y monitorea tus dispositivos IoT de manera eficiente.</p>
      </div>

      <hr />

      <div className="nav-container">
        <h2>Tus Dispositivos:</h2>

        <Link to={"/newDevice"} title="Agregar Nuevo Dispositivo">
          <BtnActionUser>
            <HiPlus size={20} style={{ backgroundColor: "transparent" }} />
          </BtnActionUser>
        </Link>
      </div>

      <div className="devices-content">
        <ul className="device-list">
          {devices.length === 0 ? (
            <p>No hay dispositivos registrados.</p>
          ) : (
            devices.map((device) => {
              const ultimoMensaje = mensajes.findLast(
                (m) => m.mac === device.macAddress
              );

              return (
                <li key={device.id} className="device-item">
                  <div className="device-info">
                    <p>
                      <b>Id del dispositivo: </b> {device.id}
                    </p>
                    <p>
                      <b>Nombre: </b> {device.name}
                    </p>
                    <p>
                      <b>MacAddress: </b> {device.macAddress}
                    </p>
                    <p>
                      <b>Status: </b> {device.status}
                    </p>
                    <p>
                      <b>Temperatura: </b> { device.status === "Fuera de Linea" ? "--" : ultimoMensaje?.valor ?? "--"} °C
                    </p>
                  </div>

                  <div className="device-actions">

                    <BtnActionUser onClick={() => handleSendSms(device.id)}>
                        <HiChatBubbleBottomCenterText
                          size={20}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </BtnActionUser>

                    <Link
                      to={`/editDevice/${device.id}`}
                      title="Editar Dispositivo"
                    >
                      <BtnActionUser>
                        <HiWrench
                          size={20}
                          style={{ backgroundColor: "transparent" }}
                        />
                      </BtnActionUser>
                    </Link>

                    <BtnActionUser onClick={() => handleDelete(device.id)}>
                      <HiTrash
                        size={20}
                        style={{ backgroundColor: "transparent" }}
                      />
                    </BtnActionUser>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
