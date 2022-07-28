import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { NoteContextProvider } from "./context/NoteContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </React.StrictMode>
);
