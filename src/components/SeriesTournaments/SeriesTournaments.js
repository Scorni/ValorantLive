import '../../assets/style/SeriesTournaments/SeriesTournaments.scss';
import React,{ useState, useEffect} from "react";
import { matchFullName } from '../../utils/commun'
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Valorant(props) {
    
    //setData will prevent from infinite call to the api
    const {game,id} = useParams()
    
    return (
        <div className='containerSeriesTournaments'>
            <div className='background'></div>
            <div className='mainHeader'>
                <p>{matchFullName(game)}</p>
            </div>
            <div className='diagonalBorderTop'></div>
            <div className='diagonalBorderBottom'></div>
            <div className='seriesBox'>
                <p className='seriesGame'>
                    <NavLink className="navlink" to={"/"+game+"/Leagues"}>Series</NavLink><br/>
                </p>
            </div>
            <div className='tournamentsBox'>
                <p className='tournamentsGame'>
                    <NavLink className="navlink" to={"/"+game+"/Leagues"}>Tournaments</NavLink><br/>
                </p>
            </div>
        </div>
    );
}