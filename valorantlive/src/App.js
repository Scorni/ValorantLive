import logo from './logo.svg';
import React,{ useState, useEffect} from "react";

import './assets/app.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Leagues from "./components/Leagues/Leagues.js"
import League from "./components/League/League.js"
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route className="navlink" exact path="/" element={<Home />} />
        <Route className="navlink" exact path="/:game/Leagues" element={<Leagues />} />
        <Route className="navlink" exact path="/:game/Leagues/:league/:id" element={<League />} />
      </Routes>
    </div>
  );
}

export default App;
