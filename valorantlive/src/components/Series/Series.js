import '../../assets/style/Valorant/valorant.scss';
import React,{ useState, useEffect} from "react";
import axios from "axios";
import {linkGenerator, matchingGame} from '../../utils/commun'
import { NavLink,useParams } from "react-router-dom";

export default function Valorant(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
    const {game,id} = useParams()
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/series',
            params:{
                games: matchingGame(game),
                id: id
            }
        }
        const fetchData = async () => {
            await axios.request(options).then(function (response) {
                const dataByFour = (response.data).reduce(function (dataByFour, key, index) { 
                    return (index % 4 === 0 ? dataByFour.push([key]) 
                      : dataByFour[dataByFour.length-1].push(key)) && dataByFour;
                  }, []);
                setData(dataByFour);
            }).catch(function (error) {
                console.error(error);
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
                                "<img class='imgLeague' src='"+data[i][j].league.image_url +"'></img>"+
                                "<br/>"+
                                "<a target='_parent' href='/"+game +"/Leagues/"+ id +"/Series/" + data[i][j].id +"/Tournaments'>"+data[i][j].full_name+"</a>"+
                            "</td>"
                }
                html += "</tr>"
            }
            setTable(html)

        }
    },[data])
    
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