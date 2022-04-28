import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./guards/ProtectedRoute";
import Login from "./views/Login/Login";
import MainMenu from "./views/MainMenu/MainMenu";
import Or from "./views/Or/Or";
import Register from "./views/Register/Register";
import Vehicles from "./views/Vehicles/Vehicles";



function App() {
  const { isAuthenticationFetched } = useAuthContext()
  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="container">
        {!isAuthenticationFetched ? (
          <p>Loading...</p>
        ) : (
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/profile" element={<MainMenu />}></Route>
          <Route path="/ors/new" element={<Or />}></Route>
          <Route path="/vehicles/new" element={<Vehicles />}></Route>
        </Route>
      </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
