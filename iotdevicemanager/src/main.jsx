import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { SignalRProvider } from "./context/SignalRContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignalRProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SignalRProvider>
  </StrictMode>
);
