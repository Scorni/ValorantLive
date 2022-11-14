import '../../assets/style/Valorant/valorant.scss';
import React,{ useState, useEffect} from "react";
import axios from "axios";
import { matchingGame,rawToEmbeddedUrl,fetchDataByFour,fetchData} from '../../utils/commun'
import { NavLink,useParams } from "react-router-dom";

export default function Match(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    const [YT, setYT] = useState()
    //setData will prevent from infinite call to the api
    const {game,id,seriesid,tournamentsid,matchid} = useParams()
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/match',
            params:{
                games: matchingGame(game),
                id: matchid
            }
        }
        fetchDataByFour(options,setData)
    }, [setData])
    useEffect(() => {
        if(data){
            for (let i in data){
                for( let j in data[i]){
                    for(let k in data[i][j].streams_list){
                        if((data[i][j].streams_list[k]).raw_url.includes('youtube')){
                            const options = {
                                method: 'GET',
                                url: 'http://localhost:8000/youtubeChannel',
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
                            html += "<img class='imgLeague' src='"+data[i][j].winner.image_url +"'></img>"+
                                "<br/>"+
                                "<a target='_parent' href='/"+game +"/Leagues/"+ id +"/Series/" + seriesid +"/Tournaments/" + tournamentsid +"/Matches/"+data[i][j].id+"'>"+data[i][j].name+"</a>"+
                                '<p>'+data[i][j].results[0].score+' - '+data[i][j].results[1].score+'</p>'
                        }else{
                            html += "<br/>"+
                                "<a target='_parent' href='/"+game +"/Leagues/"+ id +"/Series/" + seriesid +"/Tournaments/" + tournamentsid +"/Matches/"+data[i][j].id+"'>"+data[i][j].name+"</a>"+
                                "<br/>"+
                                '<p>Starting at :'+data[i][j].begin_at+'</p>'
                        }
                        if(YT){
                            html += '<iframe type="video/webm" src="'+rawToEmbeddedUrl(YT.items[0].id)+'" width="900" height="400" allowfullscreen></iframe>'
                        }else{
                            for(let k in data[i][j].streams_list){
                                html += '<iframe type="video/webm" src="'+rawToEmbeddedUrl(data[i][j].streams_list[k].raw_url)+'" width="900" height="400" allowfullscreen></iframe>'
                            }
                        }
                    html += "</td>"
                }
                html += "</tr>"
            }
            setTable(html)
        }
    },[data,YT])
    
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