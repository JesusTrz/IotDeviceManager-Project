# 🖥️ IoTDeviceManager - Web Dashboard (React)

![React Version](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Build-Vite-purple) ![License](https://img.shields.io/badge/license-MIT-green)

Este es el cliente Frontend para **IoTDeviceManager**. Una Aplicación web construida con **React** que permite a los administradores visualizar telemetría en tiempo real, configurar dispositivos y gestionar el historial de estados mediante una interfaz visual para el patrón **Memento**.

Esta aplicación consume la API construida en [.NET 9 Web API](https://github.com/JesusTrz/IotManager.git).

---

## ✨ Características de la UI

* **Dashboard en Tiempo Real:** Visualización de métricas de dispositivos (temperatura, humedad, estado de conexión) con actualización dinámica.
* **Time-Travel Debugging (Memento UI):**
    * Una línea de tiempo visual (Timeline) que muestra todos los snapshots guardados del dispositivo.
    * Botón de **"Rollback"** para restaurar la configuración de un dispositivo a un punto anterior con un solo clic.
* **Gestión de Dispositivos:** Formularios para registrar nuevos dispositivos y editar configuraciones.
* **Feedback Visual:** Notificaciones Toast para indicar éxito/error en la comunicación con las APIs IoT externas.

---

## 📸 Capturas de Pantalla

<img width="1919" height="915" alt="Image" src="https://github.com/user-attachments/assets/17bd1b36-8e8a-4e6b-94b7-9c95986f7134" />

<img width="1899" height="916" alt="Image" src="https://github.com/user-attachments/assets/6f47ac89-cad9-4383-80a3-53a15cb74262" />

<img width="1919" height="917" alt="Image" src="https://github.com/user-attachments/assets/2545787d-cd40-4986-a800-3b1f0f524926" />

---

## 🛠 Tech Stack

* **Core:** React 18 (Hooks, Context API)
* **Build Tool:** Vite (para un desarrollo y compilación ultrarrápidos)
* **Estilos:** Css
* **HTTP Client:** Axios (con interceptores para manejo de errores global)
* **Router:** React Router DOM v6
* **Manejo de Fechas:** Day.js (para formatear las fechas de los Mementos)
* **Iconos:** Heroicons 2

---

## 🚀 Guía de Instalación

### Prerrequisitos
* [Node.js](https://nodejs.org/) (v18 o superior).
* El backend de .NET 9 debe estar ejecutándose (por defecto en `https://localhost:7001`).

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone [https://github.com/tu-usuario/IoTDeviceManager-Web.git](https://github.com/tu-usuario/IoTDeviceManager-Web.git)
    cd IoTDeviceManager-Web
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    # o si usas yarn
    yarn install
    ```

3.  **Configuración de Entorno**
    Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo. Es crucial apuntar a la URL de tu API .NET.

    ```env
    VITE_API_URL=https://localhost:7001/api
    ```

4.  **Ejecutar en Desarrollo**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

---
