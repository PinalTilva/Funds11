import '../style.css';

import React, { useState } from 'react'

import Detai from '../Months/Aapi.js';
import PropTypes from 'prop-types'

const Member = (prop) => {
  const [first, setfirst] = useState('dis');

  const [name, setName] = useState('0');

  const func = () => {

    if (first === 'dis') {
      setfirst('diss');

    }
  }
 
  const funCan = () => {
    setfirst('dis');
  }

 
    
 










  let loan = 0;
  let int = 0;
  const conLoan = "loanAmount" + `${name}`;
  const conInt = "interest" + `${name}`;

  for (let i = 0; i < Detai.length; i++) {
    if (Detai[i][conLoan] !== undefined) {
      loan += (Detai[i][conLoan]);
    }
  }
  for (let i = 0; i < Detai.length; i++) {
    if (Detai[i][conInt] !== undefined) {
      int += (Detai[i][conInt]);
    }
  }



  let ban;

  const filterMem = () => {
    setName(document.getElementById('sel').value);
  };

  const fill = () => {

    const ghj = document.getElementById('sel').innerText;
    
    const Memb = ghj.split("\n");
    
    let totall = 0;

    for (let j = 1; j < Memb.length; j++) {

      const conName = "interest" + Memb[j];

      for (let i = 0; i < Detai.length; i++) {
        if (Detai[i][conName] !== undefined) {
          totall += (Detai[i][conName]);
        }
      }

    }
    localStorage.setItem("ball", totall);
  }


  ban = localStorage.getItem("ball");
  //   let baan = ban.parseInt;
  // let bn = baan.toFixed();










  return (
    <>
      <br></br>
      <br></br>

      <div className="labelMain">Select Member:</div>
      <br></br>
      <div className="diss">
        <select name="members" className='members' id='sel'>
          <option value="0">{prop.deff}</option>
          <option value="Kunj">Kunj</option>
          <option value="Vivek">Vivek</option>
          <option value="Pinal">Pinal</option>
          <option value="Jayen">Jayen</option>
          <option value="Priyal">Priyal</option>
          <option value="Brijesh">Brijesh</option>
          <option value="Karan">Karan</option>
          <option value="Krunal">Krunal</option>
          <option value="Dhaval">Dhaval</option>
          <option value="Jeet">Jeet</option>
          <option value="Kelvin">Kelvin</option>
        </select>
      </div>
      
      <br></br>
      <button className='btn2' onClick={() => { func(); filterMem(); fill() }}>Get Data</button>
      <br></br>
      <div className={`${first}`} id='divMem'>
        
        <div className="cancel" onClick={() => { funCan() }} >
          <span></span>
          <span></span>
        </div>
          
        
        <div className='selmem' >
          <div>Name : <span className='red1'>{name} </span></div>
          <div>Total Amount of loan Taken :<span className='red1'> {loan} </span> </div>
          <div>Total interest Paid: <span className='red1'> {int} </span></div>
          <div>Total Balance :<span className='red1'> {(500 * Detai.length) + parseInt(ban / 11)}</span></div>
          <div></div>
        </div>
      </div>


    </>
  )
}

Member.propTypes = {
  deff: PropTypes.string.isRequired
}
// Member.defaultProps = {
//   deff: 'enter a string'
// }

export default Member;