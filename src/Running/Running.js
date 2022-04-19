import React , {useState} from 'react'

import {Detai} from '../Months/Aapi';
import Runninglogs from './Runninglogs';

const Running = () => {

 const [run, setrun] = useState(Detai);
   


    return (

        <>

            <br></br>
            <br></br>

            <div ><Runninglogs/></div>

        </>
    )
}

export default Running;