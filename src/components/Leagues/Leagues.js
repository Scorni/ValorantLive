import '../../assets/style/Leagues/leagues.scss';
import React,{ useState, useEffect} from "react";
import {fetchDataBy, matchingGame,matchFullName} from '../../utils/commun'
import { useParams } from "react-router-dom";
import Arrow from '../../components/SVG/Arrow.js';

export default function Valorant(props) {
    const [data, setData] = useState(false);
    const [table, setTable] = useState([])
    //setData will prevent from infinite call to the api
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

    // useEffect(() => {
    //     if(data){
    //         const paginatedData = data.slice(0, perPage);
    //         setTotalPagesData(Math.ceil(data.length / perPage))
    //         let html = "<p>"+totalPagesData+"</p>";
    //         for (let i in paginatedData){
    //             html += "<tr class='leagues'>"
    //             for( let j in paginatedData[page]){
    //                 console.log(paginatedData[page]);
    //                 html += "<td>"+
    //                             "<p class='series'><a target='_parent' href='/"+game +"/Leagues/"+  data[i][j].id +"/Series'>"+data[i][j].name+"</a></p>"+
    //                         "</td>"
    //             }
    //             html += "</tr>"
    //         }
    //         setTable(html)

    //     }
    // },[data,totalPagesData])
    
    if(data){
        const paginatedData = data.slice(offset).slice(0, perPage);
        console.log(data);
        const totalPagesData = Math.ceil(data.length / perPage)
        function nextPage(){
            if(page < totalPagesData){
                // console.log(totalPagesData + " " + page);
                setPage(page +1)
            }  
        }
        function previousPage(){
            if(page > 1){
                // console.log(totalPagesData + " " + page);
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
                    <p>{matchFullName(game)}</p>
                </div>
                <div className='secondHeader'>
                    <p>LEAGUES</p>
                </div>
                
                <div>
                    {totalPagesData > 1 &&
                        <div>
                            <div onClick={() => previousPage() } className='paginationPrevious'>
                                    <Arrow  className="previousArrow"/>
                                </div>
                                <div onClick={() => nextPage()} className='paginationNext'>
                                    <Arrow  className="nextArrow"/>
                                </div>
                        </div>
                        
                    }
                    {/* <div className='banderoll'>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                        <div class="marquee-top__item">
                            <strong>LEAGUES</strong>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9.5" cy="9.5" r="9.5" fill="#020202"/>
                            </svg>
                        </div>
                    </div> */}
                    
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
    }
    
}