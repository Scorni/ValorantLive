import React,{ useState, useEffect} from "react";

import './assets/app.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Leagues from "./components/Leagues/Leagues.js"
import Series from './components/Series/Series';
import Tournaments from './components/Tournaments/Tournaments';
import Matches from './components/Matches/Matches';
import Match from './components/Match/Match';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route className="navlink" exact path="/" element={<Home />} />
        <Route className="navlink" exact path="/:game/Leagues" element={<Leagues />} />
        <Route className="navlink" exact path="/:game/Leagues/:id/Series" element={<Series />} />
        <Route className="navlink" exact path="/:game/Leagues/:id/Series/:seriesid/Tournaments" element={<Tournaments />} />
        <Route className="navlink" exact path="/:game/Leagues/:id/Series/:seriesid/Tournaments/:tournamentsid/Matches" element={<Matches />} />
        <Route className="navlink" exact path="/:game/Leagues/:id/Series/:seriesid/Tournaments/:tournamentsid/Matches/:matchid/Match" element={<Match />} />
      </Routes>
    </div>
  );
}

export default App;
