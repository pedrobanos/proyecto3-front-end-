import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/"/>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
