import "./App.css";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";
import { useState } from "react";

function App() {
  const [lightMode, setLightMode] = useState(false);
  return (
    <div className="text-white h-screen w-screen">
      <ThemeContext.Provider value={{ lightMode, setLightMode }}>
        <Dashboard />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
