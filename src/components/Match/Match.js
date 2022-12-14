import React,{ useState, useEffect} from "react";
import '../../assets/style/Match/match.scss';

import axios from "axios";
import { matchingGame,rawToEmbeddedUrl,fetchData,matchFullName, fetchDataBy} from '../../utils/commun'
import { NavLink,useParams } from "react-router-dom";

export default function Match(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    const [YT, setYT] = useState()
    //setData will prevent from infinite call to the api
    const {game,id,seriesid,tournamentsid,matchid} = useParams()
    const [page, setPage] = useState(1)
    const [perPage,setPerPage] = useState(3);
    const [league,setLeague] = useState("");
    const [tournament,setTournament] = useState("");
    const [matches,setMatches] = useState("");
    const [match,setMatch] = useState("");
    const [score,setScore] = useState("");
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://backend-api-pandascore.up.railway.app/match',
            params:{
                games: matchingGame(game),
                id: matchid
            }
        }
        fetchDataBy(options,setData,4)
    }, [setData])
    useEffect(() => {
        if(data){
            for (let i in data){
                for( let j in data[i]){
                    for(let k in data[i][j].streams_list){
                        if((data[i][j].streams_list[k]).raw_url.includes('youtube')){
                            const options = {
                                method: 'GET',
                                url: 'https://backend-api-pandascore.up.railway.app/youtubeChannel',
                                params:{
                                    channel: (data[i][j].streams_list[k]).raw_url,
                                }
                            }
                            fetchData(options,setYT)
                        }
                    }
                }
            }
        }
    }, [setYT,data])
    useEffect(() => {
        if(data){
            let html = ""
            for (let i in data){
                html += "<tr class='leagues'>"
                for( let j in data[i]){
                    html += "<td class='tdImg'>";
                        if(data[i][j].winner !== null){
                            html += 
                                "<br/>"
                        }else{
                            html += "<br/>"+
                                "<br/>"+
                                '<p class="starting">Starting at :'+data[i][j].begin_at+'</p>'
                        }
                        if(YT){
                            html += '<iframe class="player" type="video/webm" src="'+rawToEmbeddedUrl(YT.items[0].id)+'" width="900" height="500" allowfullscreen></iframe>'
                        }else{
                            for(let k in data[i][j].streams_list){
                                html += '<iframe class="player" type="video/webm" src="'+rawToEmbeddedUrl(data[i][j].streams_list[k].raw_url)+'" width="900" height="500" allowfullscreen></iframe>'
                            }
                        }
                    html += "</td>"
                }
                html += "</tr>"
            }
            setTable(html)
        }
    },[data,YT])
    useEffect(() => {
        if(data){
            setLeague(data[0][0].league.name)
            setTournament(data[0][0].serie.full_name)
            setMatches(data[0][0].tournament.name)
            setMatch(data[0][0].name)
            if((data[0][0].results[0].score+ " - " + data[0][0].results[1].score ) === "0 - 0"){
                setScore("To be played")
            }else{
                setScore((data[0][0].results[0].score+ " - " + data[0][0].results[1].score ))
            }
            
        }
    },[data,league])
    return (
        <div className="containerMatch">
            <div className='background'></div>
            <div className='firstBorder'></div>
                <div className='secondBorder'></div>
                <div className='fourthBorder'></div>
                <div className='fifthBorder'></div>
            <div className='mainHeader'>
                    <p>{matchFullName(game)}</p>
            </div>
            <div className='sixthHeader'>
                <p>{match}</p>
            </div>
             <div className='banderoll'>
                        <div class="marquee-top__item">
                            <strong>{league}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{tournament}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{matches}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{score}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{match}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{league}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{tournament}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{matches}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{score}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{match}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{league}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{tournament}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{matches}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{score}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>{match}</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                    </div>
            <table className='table'>
                <tbody className='tbody' dangerouslySetInnerHTML={{ __html: table }}>
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td id='pagination' className='pagination'></td>
                    </tr>
                </tfoot>
            </table>
            <div className="backgroundBottom">

            </div>
        </div>
    );
}