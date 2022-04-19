import '../style.css';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Detai, memeberList } from '../Months/Aapi.js';
import { Button, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
  };
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
    setName(document.getElementById('demo-simple-select').innerText);
  };
  const fill = () => {
    const ghj = document.getElementById('demo-simple-select').innerText;
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
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h4" component="div">
          Member Name : {name}
        </Typography>
        <br></br>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Total Amount Of Loan : {loan}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Total Interest Paid : {int}
        </Typography>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Total Balance : {(500 * Detai.length) + parseInt(ban / 11)}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <>
      <br></br>
      <br></br>
      <div className="labelMain">Select Member:</div>
      <br></br>
      <div className="diss">
        <Box sx={{ maxWidth: 280 }} style={{ display: "block", margin: "auto" }}>
          <FormControl fullWidth size='small'>
            <InputLabel id="demo-simple-select-label" style={{ fontWeight: "bold", color:"white" }}>Member</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Member"
              onChange={handleChange}
              style={{ color: "black", backgroundColor: "gray", borderRadius: "15px" }}
            >
              {memeberList.map((member) => {
                return (
                  <MenuItem value={member}>{member}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <br></br>
      <Button style={{ display: "block", margin: "auto" }} variant="contained" onClick={() => { func(); filterMem(); fill() }}>Get Data</Button>
      <br></br>
      <div className={`${first}`} id='divMem'>
        <Box style={{ maxWidth: 480, margin: "auto" }}>
          <CancelIcon style={{ color: "red" }} onClick={funCan} />
          <Card variant='filled'>{card}</Card>
        </Box>
      </div>
    </>
  )
}
export default Member;