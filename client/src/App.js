import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import AddCustomers from "./components/crud/add/add";
import Home from "./components/crud/Home/Home";
import NavBar from "./components/crud/NavBar/NavBar";
import EditCustomers from "./components/crud/edit/edit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/home"
            element={
              <div>
                <NavBar />
                <Home />
              </div>
            }
          />

          <Route
            exact
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add" element={<AddCustomers />} />
          <Route exact path="/edit" element={<EditCustomers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
