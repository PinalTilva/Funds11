import '../style.css'

import React, {useState} from 'react'

import Detai from '../Months/Aapi.js';
import Table1 from './table1';

const Months = () => {
  
  const [deta, setdeta] = useState(Detai);
  
  const [tab, setTab] = useState('dis');

    const func = () => {
        if (tab === 'dis') {
            setTab('diss');
            
        } 
    };
    const funCan = () => {
      setTab('dis');
    
    }
  
  const filterMonths = (month) => {
     
    const finalMonth = Detai.filter((curEE) => {
        return curEE.year === month;
    })
    setdeta(finalMonth);
};

  


  const dd = new Date();
  const dd1 = (dd.getFullYear()).toString()
  const dd2 = ("0" + (dd.getMonth() + 1).toString()).slice(-2);
  const datE = `${dd1}-${dd2}`



  return (
    <>
      
            <br></br>
            <br></br>
            <div id='didd'>
                <div className="labelMain">Select Month:</div>
                <br></br>
                <input id='inp' type="month" min="2020-12" max={datE} defaultValue={datE}></input>
                <br></br>

                <button className='btn1' onClick={() => { filterMonths(document.getElementById('inp').value); func() }}>Get Data</button>
                
            </div>
                <Table1 det={deta} tab={tab} fun ={funCan}/>
            
            
    </>
  )
}

export default Months;