import '../../assets/style/Series/series.scss';

import React,{ useState, useEffect} from "react";
import { fetchDataBy, fetchDataByThree, matchingGame,matchFullName } from '../../utils/commun'
import { useParams } from "react-router-dom";
import Arrow from '../../components/SVG/Arrow.js';


export default function Valorant(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
    const {game,id} = useParams()
    const [page, setPage] = useState(1)
    const [perPage,setPerPage] = useState(3);
    const [league,setLeague] = useState("");
    const offset = (page - 1) * perPage;
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://backend-api-pandascore.up.railway.app/series',
            params:{
                games: matchingGame(game),
                id: id
            }
        }
        fetchDataBy(options,setData,3)
    }, [setData])

    useEffect(() => {
        if(data){
            setLeague(data[0][0].league.name)
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

            <div className='containerSeries'>
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
                                                    <a  target='_parent' href={'/' +game + '/Leagues/'+  id +'/Series/' + paginatedData[index][t].id +'/Tournaments'} >{paginatedData[index][t].full_name}</a>
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
        );
    }
    else{
        return (

            <div className='containerSeries'>
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
                <div className='pagination'>
                    <div className='paginationPreviousTest'>
                        <Arrow  className="previousArrow"/>
                    </div>
                    <div className='paginationNextTest'>
                        <Arrow  className="nextArrow"/>
                    </div>
                </div>
                <table className='table'>
                    <tbody className='tbody' >
                        <tr className='leagues' >
                            <td >
                                <p className='series'>
                                    Loading..
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    
}