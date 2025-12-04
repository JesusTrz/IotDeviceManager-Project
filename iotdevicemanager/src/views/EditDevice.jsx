import React, { useEffect, useState } from "react";
import "./css/EditDevice.css";

// ICONO
import { HiArrowLeft, HiWrenchScrewdriver } from "react-icons/hi2";

// COMPONENTES
import BtnAction from "../components/btn-action/BtnAction";
import BtnActionUser from "../components/btn-action/BtnActionUser";

// NAVEGACION
import { useParams, useNavigate } from "react-router-dom";

// AXIOS
import {
  getAllDevices,
  updateDevice,
  createSnapshot,
  getSnapshotsHistory,
  restoreSnapshot,
} from "../api/devicesApi";

const EditDevice = () => {
  const volverAtras = () => {
    window.history.back();
  };

  const [configValues, setConfigValues] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState({
    id: id,
    name: "",
    status: "",
    currentConfigJson: "",
  });

  const [loading, setLoading] = useState(true);

  // SNAPSHOT
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const res = await getSnapshotsHistory(id);
      setHistory(res.data);
    } catch (error) {
      console.error("Error al obtener historial:", error);
    }
  };

  // CARGAR DATOS DEL DISPOSITIVO
  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await getAllDevices();
        const current = response.data.find((d) => d.id === parseInt(id));

        if (!current) {
          alert("Dispositivo no encontrado");
          return navigate(-1);
        }

        setDevice(current);

        try {
          const configObject = JSON.parse(current.currentConfigJson || "{}");
          setConfigValues(configObject);
        } catch (error){
          console.error("ERROR AL LEER LA CONFIGURACIÓN: " + error);
          setConfigValues({})
        }

        setLoading(false);

        loadHistory();
      } catch (error) {
        console.error("Error al cargar el dispositivo:", error);
        alert("Error al cargar el dispositivo");
      }
    };

    fetchDevice();
  }, [id, navigate]);

  // CAMBIO DE INPUTS
  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  // GUARDAR CAMBIOS SIN SNAPSHOT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonString = JSON.stringify(configValues);

    const deviceActualizado = {
      ...device,
      currentConfigJson: jsonString
    };

    try {
      await updateDevice(id, deviceActualizado);
      alert("Dispositivo actualizado correctamente");
      navigate(-1);
    } catch (error) {
      console.error("Error al actualizar el dispositivo:", error);
      alert("Error al actualizar el dispositivo");
    }
  };

  if (loading) return <h2>Cargando...</h2>;

  // Cambio de Inputs Dinamicos
  const handleConfigChange = (e) => {
    const { name, value } = e.target;

    setConfigValues((prevConfig) => ({
      ...prevConfig,
      [name] : value,
    }));
  }

  // RENDERIZADO
  return (
    <div className="device-edit-container">
      <div className="header-edit-device">
        <BtnAction onClick={volverAtras}>
          <HiArrowLeft size={30} style={{backgroundColor:"transparent"}} />
        </BtnAction>
        <div className="subtitle-edit-device">
          <h1>Configurar Dispositivo</h1>
          <p>
            Configura un dispositivo. Si en algun punto piensas volver a usar
            una configuracion antigua, no olvides crear el{" "}
            <strong>Snapshot</strong>
          </p>
        </div>
      </div>

      <hr />

      <div className="edit-container">
        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Nombre del dispositivo:</label>
          <input
            type="text"
            name="name"
            value={device.name}
            onChange={handleChange}
          />

          <label>Status:</label>
          <select name="status" value={device.status} onChange={handleChange}>
            <option value="En Linea">En Linea</option>
            <option value="Fuera de Linea">Fuera de Linea</option>
          </select>

          <div className="dynamic-config-container">
            <h3>Configuración Dinámica:</h3>
            {Object.keys(configValues).map((key) => (
              <div key={key} className="config-item">
                <label>{key}:</label>
                <input 
                type="text"
                name={key}
                value={configValues[key]}
                onChange={handleConfigChange} />
              </div>
            ))}
          </div>

          {/* <label>Configuración (JSON):</label>
          <textarea
            name="currentConfigJson"
            value={device.currentConfigJson}
            onChange={handleChange}
          /> */}

          <BtnActionUser type="submit">
            <HiWrenchScrewdriver size={20} style={{ paddingRight: "10px", backgroundColor:"transparent" }} />
            Guardar
          </BtnActionUser>
        </form>

        {/* TIMELINE */}
        <div className="timeline-device-content">
          <h2>Historial de Snapshots</h2>

          {/* Botón para crear Snapshot */}
          <BtnAction
            style={{ marginBottom: "20px" }}
            onClick={async () => {
              try {
                await createSnapshot(id);
                alert("Snapshot creado correctamente");
                loadHistory();
              } catch (err) {
                alert("Error al crear snapshot");
                console.error(err);
              }
            }}
          >
            Crear Snapshot
          </BtnAction>

          <div className="timeline-list">
            {history.length === 0 ? (
              <p>No hay snapshots registrados.</p>
            ) : (
              history.map((snap, index) => {
                const isActive =
                  snap.configSnapshotJson === device.currentConfigJson;

                const isLatest = index === 0;

                const snapNumber = history.length - index;

                return (
                  <div
                    key={snap.id}
                    className={`timeline-item ${isActive ? "active" : ""}`}
                  >
                    <div className="timeline-dot" />

                    <div className="timeline-content">
                      <p className="timeline-title">
                        Snapshot #{snapNumber}
                        {isActive && (
                          <span className="badge-active">ACTIVO</span>
                        )}
                        {!isActive && isLatest && (
                          <span className="badge-latest">ÚLTIMO GUARDADO</span>
                        )}
                      </p>

                      <p className="timeline-date">
                        {new Date(snap.timestamp).toLocaleString()}
                      </p>

                      <BtnAction
                        style={{ marginTop: "10px" }}
                        onClick={async () => {
                          const ok = confirm("¿Restaurar este snapshot?");
                          if (!ok) return;

                          try {
                            await restoreSnapshot(id, snap.id);
                            alert("Snapshot restaurado correctamente");

                            const updatedDevices = await getAllDevices();
                            const updatedDevice = updatedDevices.data.find(
                              (d) => d.id === parseInt(id)
                            );

                            setDevice(updatedDevice);
                            loadHistory();

                            try {
                              const newConfig = JSON.parse(updatedDevice.currentConfigJson || "{}");
                              setConfigValues(newConfig);
                            } catch (e) {
                              console.error("Error al parsear snapshot restaurado", e);
                            }

                          } catch (err) {
                            alert("Error al restaurar snapshot");
                            console.error(err);
                          }
                        }}
                      >
                        Restaurar
                      </BtnAction>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDevice;
