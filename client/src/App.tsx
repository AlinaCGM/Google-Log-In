import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import UserInformation from "./components/user/UserInformation";
import UserLogIn from "./components/user/UserLogIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserLogIn />}></Route>
        <Route path="/user" element={<UserInformation />}></Route>
      </Routes>
    </div>
  );
}
export default App;
