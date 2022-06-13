import React from 'react'
import Runninglogs from './Runninglogs';
const Running = ({logged, data}) => {
    return (
        <>
            <br></br>
            <br></br>
            <Runninglogs logged={logged} data={data}/>
        </>
    )
}
export default Running;