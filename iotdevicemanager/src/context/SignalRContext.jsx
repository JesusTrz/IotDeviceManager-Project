import React, { createContext, useEffect, useState, useContext } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        // 1. Construimos la conexión
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7291/iotHub") // ⚠️ Verifica el puerto
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        // 2. Preparamos los "oídos" (listeners) ANTES de arrancar
        newConnection.on('NuevoDatoIot', (dato) => {
            console.log('📡 Dato recibido:', dato);
            setMensajes(prev => [...prev.slice(-19), dato]);
        });

        // 3. Iniciamos la conexión
        newConnection.start()
            .then(() => {
                console.log('✅ Conectado a SignalR!');
                setConnection(newConnection); // Guardamos la conexión en el estado solo si conectó
            })
            .catch(error => console.error('❌ Error al conectar:', error));

        // 4. LIMPIEZA AUTOMÁTICA (Crucial para React 18)
        // Esto se ejecuta si el componente se desmonta o recarga
        return () => {
            newConnection.stop();
        };

    }, []); // Se ejecuta solo una vez al montar

    return (
        <SignalRContext.Provider value={{ connection, mensajes }}>
            {children}
        </SignalRContext.Provider>
    );
};

// 👇 TRUCO: Agregamos esta línea para que el Linter no se queje del export
// eslint-disable-next-line react-refresh/only-export-components
export const useSignalR = () => useContext(SignalRContext);