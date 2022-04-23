import '../style.css'

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Detai } from './Aapi.js';
import Table from './Table';
import { Input, Button } from '@mui/material';

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
        <Box sx={{ maxWidth: 280 }} style={{ display: "block", margin: "auto" }}>
          <Input
            id='input'
            inputProps={{ max: datE, min: "2020-12" }}
            defaultValue={datE}
            type='month'
            style={{ backgroundColor: "gray", width: "100%", borderRadius: "15px", padding: "5px 10px 5px 10px" }}
          >
          </Input>
        </Box>
        <br></br>
        <Button
          style={{ display: "block", margin: "auto" }}
          variant="contained"
          onClick={() => { filterMonths(document.getElementById('input').value); func() }}
        >
          Get Data
        </Button>
      </div>
      <Table det={deta} tab={tab} fun={funCan} />
    </>
  )
}

export default Months;