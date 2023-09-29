import {} from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";

import RoutesConfig from "./app.routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MixerDetailsProvider } from "./shared/contexts";

function App() {
  const routes = useRoutes(RoutesConfig);
  return (
    <MixerDetailsProvider>
      {routes}
      <ToastContainer />
    </MixerDetailsProvider>
  );
}

export default App;
