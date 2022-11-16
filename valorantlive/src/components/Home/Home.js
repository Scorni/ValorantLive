import '../../assets/style/Home/home.scss';

import React,{ useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { fetchData } from "../../utils/commun";

export default function Rank(props) {
    const [data, setData] = useState(false);

    //setData will prevent from infinite call to the api
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/live'
        }
        fetchData(options,setData)
    }, [setData])

    return (
        <div className='container'>
            <div className='background'></div>
            <div className='mainHeader'>
                <p>ESPORTS STATS</p>
            </div>
            <div className='firstBorder'>
                <div className='moba'>
                    <p className='gameType'>MOBA</p>
                    <p className='game'>
                        <NavLink className="navlink" to={`/lol/Leagues`}>LoL</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={`/dota-2/Leagues`}>Dota 2</NavLink>   <br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={`/kog/Leagues`}>King of Glory</NavLink>   <br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={`/lol-wild-rift/Leagues`}>LoL Wild Rift</NavLink>   <br/>
                    </p>
                </div>
            </div>
            <div className='secondBorder'>
                <div className='fps'>
                    <p className='gameType'>FPS</p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/valorant/Leagues"}>Valorant</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/cs-go/Leagues"}>CS:GO</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/r6-siege/Leagues"}>Rainbow 6 Siege</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/cod-mw/Leagues"}>Call of Duty</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/pubg/Leagues"}>PUBG</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/ow/Leagues"}>Overwatch</NavLink><br/>
                    </p>
                </div>
            </div>
            
            <div className='fourthBorder'>
                <div className='rts'>
                    <p className='gameType'>RTS</p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/starcraft-brood-war/Leagues"}>StarCraft Brood War</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/starcraft-2/Leagues"}>StarCraft 2</NavLink><br/>
                    </p>
                </div>
            </div>
            <div className='fifthBorder'>
                <div className='other'>
                    <p className='gameType'>OTHER</p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/fifa/Leagues"}>FIFA</NavLink><br/>
                    </p>
                    <p className='game'>
                        <NavLink className="navlink" to={"/rl/Leagues"}>Rocket League</NavLink><br/>
                    </p>
                </div>
            </div>
                
        </div>
        
    );
}