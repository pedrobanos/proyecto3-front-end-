import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/Login/Login";
import MainMenu from "./views/MainMenu/MainMenu";
import Register from "./views/Register/Register";
import Vehicles from "./views/Vehicles/Vehicles";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/garages/:id/mainmenu" element={<MainMenu/>}></Route>
        <Route path="/vehicles/new" element={<Vehicles/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
