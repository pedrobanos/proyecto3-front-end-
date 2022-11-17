import { Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import { useAuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./guards/ProtectedRoute";
import CarOwners from "./views/CarOwners/CarOwners";
import ListOfVehicles from "./views/ListOfVehicles/ListOfVehicles";
import Login from "./views/Login/Login";
import MainMenu from "./views/MainMenu/MainMenu";
import Or from "./views/Or/Or";
import Register from "./views/Register/Register";
import Vehicles from "./views/Vehicles/Vehicles";
import DetailFromOr from "./views/DetaiFromOr/DetailFromOr";
import CarOwnersList from "./views/CarOwners/CarOwnersList";
import PendingOrs from "./views/Or/PendingOrs";
import CarOwnersEdit from "./views/CarOwners/CarOwnersEdit";
import EditVehicleList from "./views/ListOfVehicles/EditVehicleList";



function App() {
  const { isAuthenticationFetched } = useAuthContext()
  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="container">
        {!isAuthenticationFetched ? (
        <Spinner/>
        ) : (
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<MainMenu />}></Route>
          <Route path="/carowners/new" element={<CarOwners />}></Route>
          <Route path="/carowners" element={<CarOwnersList/>}></Route>
          <Route path="/carowners/:id" element={<CarOwnersEdit/>}></Route>
          <Route path="/vehicles/new" element={<Vehicles />}></Route>
          <Route path="/vehicles" element={<ListOfVehicles />}></Route>
          <Route path="/vehicles/:id" element={<EditVehicleList />}></Route>
          <Route path="/ors/new" element={<Or />}></Route>
          <Route path="/ors" element={<PendingOrs/>} ></Route> 
          <Route path="/ors/:id" element={<DetailFromOr/>}></Route>
        </Route>
      </Routes>
        )}
      </div>
    </div>
  );
}

export default App;

