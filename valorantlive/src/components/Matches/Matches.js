import '../../assets/style/Valorant/valorant.scss';
import React,{ useState, useEffect} from "react";
import { matchingGame,fetchDataByFour} from '../../utils/commun'
import { useParams } from "react-router-dom";

export default function Matches(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
    const {game,id,seriesid,tournamentsid} = useParams()

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/matches',
            params:{
                games: matchingGame(game),
                id: tournamentsid
            }
        }
        fetchDataByFour(options,setData)
    }, [setData])

    useEffect(() => {
        if(data){
            let html = ""
            for (let i in data){
                html += "<tr class='leagues'>"
                for( let j in data[i]){
                    // console.log(data);
                    html += "<td class='tdImg'>"+
                                "<br/>"+
                                "<a target='_parent' href='/"+game +"/Leagues/"+ id +"/Series/" + seriesid +"/Tournaments/" + tournamentsid +"/Matches/"+data[i][j].id+"/Match'>"+data[i][j].name+"</a>"+
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