import '../../assets/style/Leagues/leagues.scss';
import React,{ useState, useEffect} from "react";
import {fetchDataBy, matchingGame,matchFullName} from '../../utils/commun'
import { useParams } from "react-router-dom";
import Arrow from '../../components/SVG/Arrow.js';

export default function Valorant(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    const {game} = useParams()
    const [page, setPage] = useState(1)
    const [perPage,setPerPage] = useState(3);
    const offset = (page - 1) * perPage;
    
    
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://backend-api-pandascore.up.railway.app/leagues',
            params:{
                games: matchingGame(game)
            }
        }
        fetchDataBy(options,setData,4)
    }, [setData])

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

            <div className='containerLeagues'>
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
                        
                        {!paginatedData &&
                            <tr className='leagues' >
                                <td >
                                    <p className='series'>
                                        Loading..
                                    </p>
                                </td>
                            </tr>
                        }
                        {paginatedData &&
                        (paginatedData).map((value, index) => {
                            return (
                            <tr className='leagues' key={index}>

                                {(paginatedData[index]).map((value, t) => {
                                    return (
                                        <td key={t}>
                                            <p className='series'>
                                                <a  target='_parent' href={'/' +game + '/Leagues/'+  paginatedData[index][t].id +'/Series'} >{paginatedData[index][t].name}</a>
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
    }else{
        return (

            <div className='containerLeagues'>
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
                
                <div>
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
            </div>
        );
    }
    
}