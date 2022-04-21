import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./views/Register/Register";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/"/>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
