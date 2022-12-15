import '../../assets/style/Tournaments/tournaments.scss';

import React,{ useState, useEffect} from "react";
import { fetchDataBy, matchingGame,matchFullName } from '../../utils/commun'
import { useParams } from "react-router-dom";
import Arrow from '../../components/SVG/Arrow.js';

export default function Tournaments(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
    const {game,id,seriesid} = useParams()
    const [page, setPage] = useState(1)
    const [perPage,setPerPage] = useState(3);
    const [league,setLeague] = useState("");
    const [tournament,setTournament] = useState("");
    const offset = (page - 1) * perPage;
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/tournaments',
            params:{
                games: matchingGame(game),
                id: seriesid
            }
        }
        fetchDataBy(options,setData,4)
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
                                "<a target='_parent' href='/"+game +"/Leagues/"+ id +"/Series/" + seriesid +"/Tournaments/" + data[i][j].id +"/Matches'>"+data[i][j].name+"</a>"+
                            "</td>"
                }
                html += "</tr>"
            }
            setTable(html)
        }
    },[data])
    useEffect(() => {
        if(data){
            setLeague(data[0][0].league.name)
            setTournament(data[0][0].serie.full_name)
        }
    },[data,league])
    if(data){
        const paginatedData = data.slice(offset).slice(0, perPage);
        const totalPagesData = Math.ceil(data.length / perPage)
        function nextPage(){
            if(page < totalPagesData){
                setPage(page +1)
            }  
        }
        function previousPage(){
            if(page > 1){
                setPage(page - 1)
            }  
        }
        return (

            <div className='containerTournaments'>
                <div className='background'></div>
                <div className='firstBorder'></div>
                <div className='secondBorder'></div>
                <div className='fourthBorder'></div>
                <div className='fifthBorder'></div>
                <div className='mainHeader'>
                    <a href='/'><p>{matchFullName(game)}</p></a>
                </div>
                <div className='secondHeader'>
                    <p>LEAGUES</p>
                </div>
                <div className='thirdHeader'>
                    <p>{league}</p>
                </div>
                <div className='fourthHeader'>
                    <p>{tournament}</p>
                </div>
                <div>
                    {totalPagesData > 1 &&
                        <div className='pagination'>
                            <div onClick={() => previousPage() } className='paginationPreviousTest'>
                                    <Arrow  className="previousArrow"/>
                                </div>
                                <div onClick={() => nextPage()} className='paginationNextTest'>
                                    <Arrow  className="nextArrow"/>
                                </div>
                        </div>
                    }
                    <table className='table'>
                        <tbody className='tbody' >
                        

                        {paginatedData &&
                        (paginatedData).map((value, index) => {
                            return (
                            <tr className='leagues' key={index}>

                                {(paginatedData[index]).map((value, t) => {
                                        return (
                                            <td key={t}>
                                                <p className='series'>
                                                    <a  target='_parent' href={'/' +game + '/Leagues/'+  id  +'/Series/' + seriesid +'/Tournaments/'+paginatedData[index][t].id+'/Matches'} >{paginatedData[index][t].name}</a>
                                                </p>
                                            </td>
                                            )
                                        })}
                                    </tr>
                                    )
                            
                                })
                                
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}