import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopNavBar from "./components/Header/topNavBar";
//import { Home, Search, Settings } from "./pages"; couldn't get this to work
import Home from "./pages/Home";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
