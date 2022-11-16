import '../../assets/style/Leagues/leagues.scss';
import React,{ useState, useEffect} from "react";
import {fetchDataByFour, matchingGame,withoutHyphen} from '../../utils/commun'
import { useParams } from "react-router-dom";

export default function Valorant(props) {
    const [data, setData] = useState(false);
    const [totalPagesData, setTotalPagesData] = useState(false);
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
    const {game} = useParams()

    const page = 1 
    const [perPage,setPerPage] = useState(3);
    const offset = (page - 1) * perPage;

    if(data){
        
    }
    
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/leagues',
            params:{
                games: matchingGame(game)
            }
        }
        fetchDataByFour(options,setData)
    }, [setData])

    useEffect(() => {
        if(data){
            const paginatedData = data.slice(0, perPage);
            setTotalPagesData(Math.ceil(data.length / perPage))
            console.log(totalPagesData);
            console.log(data);
            let html = "<div>"+totalPagesData+"</div>"
            for (let i in paginatedData){
                html += "<tr class='leagues'>"
                for( let j in paginatedData[i]){
                    // console.log(data);
                    html += "<td>"+
                                "<p class='series'><a target='_parent' href='/"+game +"/Leagues/"+  data[i][j].id +"/Series'>"+data[i][j].name+"</a></p>"+
                            "</td>"
                }
                html += "</tr>"
            }
            setTable(html)

        }
    },[data,totalPagesData])
    
    return (

        <div className='containerLeagues'>
            <div className='background'></div>
            <div className='firstBorder'></div>
            <div className='secondBorder'></div>
            <div className='fourthBorder'></div>
            <div className='fifthBorder'></div>
            <div className='mainHeader'>
                <p>{withoutHyphen(game)}</p>
            </div>
            
            <div>
                <div className='pagination'>
                    <p>{">"}</p>
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
            </div>
            
        </div>
    );
}