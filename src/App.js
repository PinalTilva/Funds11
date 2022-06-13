import './style.css';
import './styleM.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import $ from 'jquery';
import Member from './Members/Members';
import Months from './Months';
import Running from './Running';
import Home from './Home';
import Activity from './Activities';
import { Menu, MenuItem } from '@mui/material';
import { MenuOutlined, AccountCircleRounded } from '@mui/icons-material';
import Admin from './Admin/admin';
import Updates from './Update/updates';


const App = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggeD, setloggeD] = useState(false)
  const [cls, setCls] = useState("inline-block")
  const [men, setMen] = useState("-310px")
  const [data, setdata] = useState([]);
  const [open1, setopen1] = useState(false);
  const openn = Boolean(anchorEl);
  const funb = () => {
    if (cls === "inline-block") {
      setCls("none");
    }
  }
  const funbb = () => {
    if (men == "-310px") {
      setMen("0%");
    }
    else {
      setMen("-310px")
    }
  }
  const touch = () => {
    if (men == "0%") {
      setMen("-310px");
      if (cls === "none") {
        setCls("inline-block")
      }
    }
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

  const callB = async() => {
    await fetch('/get', {
      method: 'get'
    }).then((response) => {
      response.json().then((dataa) => setdata([...dataa]));
    }).catch((err) => {
      console.log('err', err);
    });
  };

  React.useEffect( callB, []);

  React.useEffect(() => {
    let code = localStorage.getItem("code");
    code && setloggeD(true);
  },[]);

  const callBack = (props) => {
    setloggeD(props.first);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setopen1(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Router>
        <header id='NavDiv'>
          <MenuOutlined
            id="nav-icon"
            onClick={() => { funb(); funbb() }}
            style={{ display: cls }}
          />
          {
            !loggeD ?
              <Link to={'/login'}>
                <AccountCircleRounded
                  style={{
                    float: 'right',
                    fontSize: 35,
                    position: 'relative',
                    top: 13,
                    right: 13,
                    cursor: 'pointer',
                    color: 'white',
                  }}
                />
              </Link> : <>
                <AccountCircleRounded
                  onClick={handleClick}
                  id='user'
                  style={{
                    float: 'right',
                    fontSize: 35,
                    position: 'relative',
                    top: 13,
                    right: 13,
                    cursor: 'pointer',
                    color: 'black',
                  }}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open1 && openn}
                  onClose={handleClose}
                >
                  <Link style={{ textDecoration: 'none' }} to={'/update'}><MenuItem onClick={() => setopen1(false)}>Add Loans</MenuItem></Link>
                  <Link style={{ textDecoration: 'none' }} to={'/'}><MenuItem onClick={() => { setloggeD(false); setopen1(false); localStorage.clear() }}>Logout</MenuItem></Link>
                </Menu>
              </>
          }

        </header>
        <br></br>
        <div id="logo" >
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <p style={{ color: 'wheat' }}>Funds11</p>
          </Link>
        </div>
        <nav>
          <div className='slider' id='sliderL' style={{ left: `${men}` }} onClick={() => { touch() }}>
            <br></br>
            <br></br>
            <br></br>
            <li>
              <Link to={'/months'} className='sliDiv'>
                <i className='material-icons'>event</i>
                Monthly Statement
              </Link>
            </li>
            <li>
              <Link to={'/member'} className='sliDiv'>
                <i className='material-icons'>people</i>
                Member Details
              </Link>
            </li>
            <li>
              <Link to={'/activities'} className='sliDiv'>
                <i className='material-icons'>history</i>
                Activities
              </Link>
            </li>
            <li>
              <Link to={'/running_loans'} className='sliDiv'>
                <i className='material-icons'>paid</i>
                Running Loans
              </Link>
            </li>
            <a href='https://github.com/PinalTilva/Funds11' className='sliDiv' target={'_blank'}><i className='material-icons'>code</i> Get Code</a>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          {loggeD && <Route path='/update' element={<Updates data={data}/>} />}
          <Route path='/login' element={<Admin callback={callBack} loggeD={loggeD}/>} />
          <Route path='/months' element={<Months data={data} loggeD={loggeD}/>} />
          <Route path='/member' element={<Member data={data} loggeD={loggeD}/>} />
          <Route path='/activities' element={<Activity data={data}/>} />
          <Route path='/running_loans' element={<Running logged={loggeD} data={data}/>} />
        </Routes>

      </Router>
    </>
  )
}
export default App