import '../style.css';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Detai, memberList } from '../Months/Aapi.js';
import { Button, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SettingsOverscanOutlined } from '@mui/icons-material';
const Member = (prop) => {
  const [first, setfirst] = useState('dis');
  const [name, setName] = useState('0');
  const [total, settotal] = useState(0)
  const func = () => {
    if (!memberList.includes(name)) {
      alert("Please select member")
    } else if (first === 'dis') {
      setfirst('diss');
    }
  }
  const setDisplay = () => {
    setfirst('dis');
  }
  const handleChange = (event) => {
    setName(event.target.value);
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
  const calInt = () => {
    let total = 0;
    memberList.forEach((member) => {
      for (let i = 0; i < Detai.length; i++) {
        if (Detai[i]["interest" + member] !== undefined) {
          total += (Detai[i]["interest" + member]);
        }
      }
    })
    settotal(total)
  }
  

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
          Total Balance : {(500 * Detai.length) + parseInt(total / 11)}
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
            <InputLabel id="demo-simple-select-label" style={{ fontWeight: "bold", color: "white" }}>Member</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Member"
              onChange={handleChange}
              style={{ color: "black", backgroundColor: "gray", borderRadius: "15px" }}
            >
              {memberList.map((member) => {
                return (
                  <MenuItem value={member}>{member}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <br></br>
      <Button style={{ display: "block", margin: "auto" }} variant="contained" onClick={() => { func(); calInt() }}>Get Data</Button>
      <br></br>
      <div className={`${first}`} id='divMem'>
        <Box style={{ maxWidth: 480, margin: "auto" }}>
          <CancelIcon
            fontSize='large'
            style={{ color: "red", position: "relative", left: "90%" }}
            onClick={setDisplay}
          />
          <Card variant='filled'>{card}</Card>
        </Box>
      </div>
    </>
  )
}
export default Member;