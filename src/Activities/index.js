import '../style.css';

import React, { useState } from 'react';

import Activity1 from './Activity1';
import {Detai} from '../Months/Aapi';

const Activity = () => {

    const [years, setyears] = useState([])
    const newDeta = [];
    const func = () => {
        newDeta.push(Detai.filter((elem) => {
            return elem.year.slice(0, 4) == "2020"
        }))
        newDeta.push(Detai.filter((elem) => {
            return elem.year.slice(0, 4) == "2021"
        }))
        newDeta.push(Detai.filter((elem) => {
            return elem.year.slice(0, 4) == "2022"
        }))
        setyears(newDeta);
    }
    return (
        <>
            <br></br>
            <br></br>
            <Activity1 yearS={years} fun={func} />
        </>
    )
}

export default Activity;