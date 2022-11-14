import '../../assets/style/Valorant/valorant.scss';
import React,{ useState, useEffect} from "react";
import { fetchDataByFour, matchingGame } from '../../utils/commun'
import { useParams } from "react-router-dom";

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
        fetchDataByFour(options,setData)
    }, [setData])

    useEffect(() => {
        if(data){
            console.log(data);
            let html = ""
            for (let i in data){
                html += "<tr class='leagues'>"
                for( let j in data[i]){
                    // console.log(data);
                    html += "<td class='tdImg'>"+
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