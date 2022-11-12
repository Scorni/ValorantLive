import '../../assets/style/Valorant/valorant.scss';
import React,{ useState, useEffect} from "react";
import axios from "axios";
import {linkGenerator, matchingGame,sortByTournament,withoutHyphen} from '../../utils/commun'
import { NavLink,useParams } from "react-router-dom";

export default function Valorant(props) {
    const [data, setData] = useState(false);
    const [tournaments, setTournaments] = useState(false)
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
    const {game,league,id}= useParams()
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/league',
            params:{
                games: matchingGame(game),
                league: league,
                id: id
            }
        }
        const fetchData = async () => {
            await axios.request(options).then(function (response) {
                setTournaments(sortByTournament(response.data))

                const dataByFour = (response.data).reduce(function (dataByFour, key, index) { 
                    return (index % 4 === 0 ? dataByFour.push([key]) 
                      : dataByFour[dataByFour.length-1].push(key)) && dataByFour;
                  }, []);
                setData(dataByFour);
                // console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
        fetchData()
        
    }, [setData])
    useEffect(() => {
        if(data){
            let html = ""
            for (let i in data){
                html += "<tr class='leagues'>"
                for( let j in data[i]){
                    // console.log(data);
                    html += "<td class='tdImg'>"+
                                "<img class='imgLeague' src='"+data[i][j].image_url +"'></img>"+
                                "<br/>"+
                                "<a target='_parent' href='/"+game +"/Leagues/"+ linkGenerator(data[i][j].slug)+"'>"+data[i][j].name+"</a>"+
                                "<p>"+data[i][j].tournament_id+"</p>"+
                            "</td>"
                }
                html += "</tr>"
            }
            setTable(html)

        }
    },[data])
    useEffect(() => {
        if(tournaments){
            let html = ""
                
                for( let j in tournaments){
                    // console.log(data);
                    html += "<tr class='leagues'>"+
                            "<td class='tdImg'>"+
                                "<a target='_parent' href='/"+game +"/Leagues/"+ linkGenerator(tournaments[j])+"'>"+withoutHyphen(tournaments[j],game)+"</a>"+
                            "</td>"+
                            "</tr>"
                }
            setTable(html)

        }
    },[tournaments])
    return (
        <div>
            <h1>Welcome There</h1>
            <h3>Choose your League !</h3>
            
            <table className='table'>
                <tbody className='tbody' dangerouslySetInnerHTML={{ __html: table }}>
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td id='pagination' className='pagination'></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}