
import React,{ useState, useEffect} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


export default function Rank(props) {
    const [data, setData] = useState(false);

    //setData will prevent from infinite call to the api
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/live'
        }
        const fetchData = async () => {
            await axios.request(options).then(function (response) {
                setData(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }
        fetchData()
        
    }, [setData])


    return (
        <div>
            <h1>Welcome There</h1>
            <h3>Choose your game !</h3>
            <table>
                <tbody>
                {data &&
                    data.map((value, index) => {
                            
                            
                            return (
                                <tr id="ranks" className={value.id} key={index} title={value.name} >
                                    <td className='bordered'>
                                        <NavLink className="navlink" to={`/${value.slug}/Leagues`}>{value.name}</NavLink>    
                                    </td>
                                </tr>
                            )
                        })
                }
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