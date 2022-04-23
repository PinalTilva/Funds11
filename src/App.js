import './style.css';
import './styleM.css';
import React, { useState } from 'react';
import $ from 'jquery';
import Member from './Members/Members';
import Months from './Months';
import Running from './Running';

import logo from './favv.png'
import qr from './qrcode.png'
import Activity from './Activities';

const App = () => {
  
  const [cls, setCls] = useState("close")
  const [men, setMen] = useState("-350px")
  const [aa, setaa] = useState('dis')
  const [bb, setbb] = useState('dis')
  const [cc, setcc] = useState('dis')
  const [lgq, setlgq] = useState('logoQr')
  const [fav, setfav] = useState('logoCir')
  const home = () => {
    setaa('dis');
    setbb('dis');
    setcc('dis');
    setfu('dis');
    setlgq('logoQr');
    setfav('logoCir');
  }
  const funb = () => {
    if (cls === "close") {
      setCls("open");
    }
  }
  const funbb = () => {
    if (men == "-350px") {
      setMen("0%");
    }
    else {
      setMen("-350px")
    }
  }
  const touch = () => {
    if (men == "0%") {
      setMen("-350px");
      if (cls === "open") {
        setCls("close")
      }
    }
  }
  const funA = () => {
    if (aa == 'dis') {
      setaa('diss');
      setbb('dis');
      setcc('dis');
      setfu('dis');
      setlgq('dim');
      setfav('dim1');
      if (men == "0%") {
        setMen("-350px");
      }
      if (cls === "open") {
        setCls("close")
      }
    }
  }
  const funB = () => {

    if (bb == 'dis') {
      setbb('diss');
      setaa('dis');
      setcc('dis');
      setfu('dis');
      setlgq('dim');
      setfav('dim1');

      if (men == "0%") {
        setMen("-350px");
      }
      if (cls === "open") {
        setCls("close")
      }
    }
  }
  const funC = () => {
    if (cc == 'dis') {
      setcc('diss');
      setaa('dis');
      setbb('dis');
      setfu('dis');
      setlgq('dim');
      setfav('dim1');
      if (men == "0%") {
        setMen("-350px");
      }
      if (cls === "open") {
        setCls("close")
      }
    }
  }
  const [fu, setfu] = useState("dis")
  const funcs = () => {
    setfu("diss");
    setaa('dis');
    setbb('dis');
    setcc('dis');
    setlgq('dim');
    setfav('dim1');
  }
  $(window).scroll(() => {
    let ass = 50 - ($(window).scrollTop() / 2) / 2;
    if ($(window).scrollTop() <= 80) {
      $('#logo').css('font-size', ass + 'px');
    } else if ($(window).scrollTop() > 80) {
      $('#logo').css('font-size', '30px');
    }
    else {
      $('#logo').attr('style', '');
    }
  })
  return (
    < >
      <header id='NavDiv'>
        <nav id="navBar">
          {/* <img src='./gaphy.gif' onClick={() => { funcs() }} /> */}
        </nav>
      </header>
      <div id="nav-icon3" onClick={() => { funb(); funbb() }} className={`${cls}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <br></br>
      <div id="logo" >
      <p style={{ color: 'wheat' }} onClick={() => { home() }}>Funds11</p>
      </div>
      <nav>
        <div className='slider' id='sliderL' style={{ left: `${men}` }} onClick={() => { touch() }}>
          <br></br><br></br>
          <br></br>
          <a href='#' className='sliDiv sliDiv--active' onClick={() => { funA() }}><i className='material-icons'>event</i> Monthly Statement</a>
          <a href='#' className='sliDiv sliDiv--active' onClick={() => { funB() }}><i className='material-icons'>people</i> Member Details</a>
          <a href='#' className='sliDiv sliDiv--active' onClick={() => { funC() }}><i className='material-icons'>history</i> Activities</a>
          <a href='#' className='sliDiv sliDiv--active' onClick={() => { funcs() }}><i className='material-icons'>paid</i> Running Loans</a>
          <a href='https://github.com/PinalTilva/Funds11' className='sliDiv' target={'_blank'}><i className='material-icons'>code</i> Get Code</a>
        </div>
        <div className="overlay">
        </div>
      </nav>
      <div className={`${lgq}`}>
        <div className={`${fav}`}><img id='im' src={logo} alt="" /></div>
        <div id='homeQR'>
          <a href="https://wa.me/917041142889?text=I%20want%20to%20know%20more%20about%20funds11"><img id='qr' src={qr} alt="" /></a>
        </div>
      </div>
          <br></br>
      <div id='divMain'>
        <div id='div22'>
          <div className={`${aa}`}><Months /></div>
          <div className={`${bb}`}><Member deff='Select' /></div>
          <div className={`${cc}`}><Activity /></div>
          <div className={`${fu}`}><Running/></div>
          <br></br>
        </div>
      </div>
    </>
  )
}
export default App