import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import StartGame from "./Components/StartGame"; 
import SelectVehicleByCop from "./Components/SelectVehicleByCop";
import SelectCityByCop from "./Components/SelectCityByCop";

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StartGame />} /> {/* Set the StartGame component as the default route */}
          <Route path = "/selectcitybycop" element = {<SelectCityByCop copNames={['Cop 1', 'Cop 2', 'Cop 3']} />
}></Route>
          <Route path = "/selectvehiclebycop" element = {<SelectVehicleByCop/>}></Route>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
