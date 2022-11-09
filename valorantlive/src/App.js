import logo from './logo.svg';
import React,{ useState, useEffect} from "react";

import './assets/app.css';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import StarcraftBroodWar from "./components/StarcraftBroodWar/StarcraftBroodWar.js";
import Valorant from "./components/Valorant/Valorant.js"
import Leagues from "./components/Leagues/Leagues.js"
import axios from "axios";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    const options = {
        method: 'GET',
        url: 'http://localhost:8000/live'
    }
    const fetchData = async () => {
        await axios.request(options).then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }
    fetchData()
    
}, [setData])


  return (
    <div className="App">
      <Routes>

      {/* {data &&
          data.map((value, index) => {
                  let Element = value.slug.replaceAll('-', '')
                  // console.log(Element);
                  return (
                      <Route className="navlink" key={index} exact path={"/"+Element} element={<StarcraftBroodWar/>  } />
                  )
              })
      } */}

        <Route className="navlink" exact path="/" element={<Home />} />
        <Route className="navlink" exact path="/:game/Leagues" element={<Leagues />} />
        <Route className="navlink" exact path="/Starcraftbroodwar" element={<StarcraftBroodWar />} />
      </Routes>
    </div>
  );
}

export default App;
