import '../style.css';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Create, ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  months,
  memberList
} from '../Months/Aapi.js';
import {
  Backdrop,
  Button,
  Card,
  Chip,
  Divider,
  Badge,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
  CardActions,
  IconButton,
  Collapse
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import getDuration from '../Functions/getDuration';
import dateConvert from '../Functions/dateConverter';

const Member = ({ data, loggeD }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [param, setParam] = useState();
  const [first, setfirst] = useState(false);
  const [name, setName] = useState('0');
  const [Total, setTotal] = useState(0);
  const [Loan, setLoan] = useState(0);
  const [Int, setInt] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
      right: -6,
      top: 3,
      border: 'px solid purple',
      fontSize: 10,
      fontWeight: 'bold',
      opacity: 0.7,
      backgroundColor: '#5d8989'
    },
  }));

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const calInt = () => {
    let loan = 0;
    let int = 0;
    let total = 0;
    if (!memberList.includes(name)) {
      alert("Please select member")
    } else if (first === false) {
      setfirst(true);
    };
    data && data.map((item) => {
      Object.entries(item["loan"]).map((i) => {
        if (i.includes(name)) {
          loan += i[1]["Amount"];
        }
      });
      Object.entries(item["interest"]).map((i) => {
        Object.values(i[1]).map((ii) => {
          total += ii;
        });
        if (i[0] === name) {
          Object.values(i[1]).map((ii) => {
            int += ii;
          });
        };
      })
    })
    setLoan(loan);
    setInt(int);
    setTotal(total);
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      headerAlign: 'center',
      flex: !loggeD && 0.8,
      width: loggeD && 80,
      sortable: false,
      hide: true
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerAlign: 'center',
      flex: !loggeD && 0.8,
      sortable: false,
      width: loggeD && 80,
      renderCell: (params) => (
        <Tooltip title={params.value.duration}>
          <strong>
            {params.value.amount}
          </strong>
        </Tooltip>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      headerAlign: 'center',
      flex: !loggeD && 0.7,
      width: loggeD && 65,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Tooltip title={params.value.year} >
            <strong>
              {params.value.fullDate}
            </strong>
          </Tooltip>
        </div>
      )
    },
    {
      field: 'end',
      headerName: 'End',
      headerAlign: 'center',
      flex: !loggeD && 0.7,
      width: loggeD && 65,
      sortable: false,
      renderCell: (params) => (
        <div>
          {params.value === 'Running' ?
            <strong>
              {params.value}
            </strong>
            : <Tooltip title={params.value.year}>
              <strong>
                {params.value.fullDate}
              </strong>
            </Tooltip>}
        </div>
      ),
      cellClassName: (params) => {
        if (params.value === 'Running') {
          return 'running'
        }
      }

    },
    {
      field: 'int',
      headerName: 'Int',
      headerAlign: 'center',
      flex: !loggeD && 0.6,
      width: loggeD && 65,
      sortable: false,
      renderCell: (params) => (
        <strong>
          {params.value}
        </strong>
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      flex: !loggeD && 0.9,
      width: loggeD && 80,
      sortable: false,
      hide: loggeD ? false : true,
      renderCell: (params) => (
        <div>
          <Tooltip title='Edit'>
            <Create color='primary' />
          </Tooltip>
          <Tooltip title='Delete'>
            <DeleteForeverIcon
              color='error'
              onClick={() => { setOpenDialog(true); setParam(params.row) }}
              style={{ marginLeft: 10 }}
            />
          </Tooltip>
        </div>
      )
    },
  ];

  const row = [];
  data && data.map((item) => {
    const obj = {};
    var loanId = 0;
    let int = 0;
    if (Object.keys(item["loan"]).includes(name)) {
      loanId = item.loan[name]['loanId']
      obj.id = row.length + 1;
      obj.loanId = item.loan[name]['loanId'];
      obj.year = item.year;
      obj.name = name;
      obj.amount = {};
      obj.amount.amount = item.loan[name].Amount;
      obj.amount.duration = getDuration(item.loan[name].Date, item.loan[name].End);
      obj.date = {};
      obj.date.fullDate = dateConvert(item.loan[name].Date).props.children;
      obj.date.year = (item.loan[name].Date).slice(0, 4);
      obj.end = {};
      if (item.loan[name].End !== 'Running') {
        obj.end.fullDate = dateConvert(item.loan[name].End).props.children;
        obj.end.year = (item.loan[name].End).slice(0, 4);
      } else {
        obj.end = dateConvert(item.loan[name].End).props.children;
      }
      data.map((i) => {
        if (Object.keys(i["interest"]).includes(name)) {
          i['interest'][name][loanId] && (int += i['interest'][name][loanId]);
        }
      })
      obj.int = int
      row.push(obj);
    };
  });

  const deleteItem = async () => {
    let token = localStorage.getItem("code");
    await fetch('/delete', {
      method: 'put',
      body: JSON.stringify({ row: param }),
      headers: {
        'Authorization': `Funds11${token}`,
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then((response) => {
      window.location.reload();
    }).catch((err) => {
      console.log('err', err);
    });
    setOpenDialog(false)
  }

  const card = (
    <React.Fragment>
      <br />
      <Typography variant="h4" component="div">
        <Divider>
          <Chip
            label={name}
            style={{
              backgroundColor: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'grey'
            }}
          />
        </Divider>
      </Typography>
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        color="text.secondary"
        gutterBottom
      >
        <div style={{ width: '95%', margin: 'auto', backgroundColor: 'white', borderRadius: 5 }}>
          <div style={{ padding: 10, fontWeight: 'bold' }}>
            Total Amount Of Loan : &#8377; {Loan}
          </div>
          <DataGrid
            sx={{
              '&.MuiDataGrid-root': {
                border: 'none',
                backgroundColor: 'white',
                color: 'black'
              },
              '.MuiDataGrid-columnSeparator': {
                display: 'none'
              },
              '.MuiDataGrid-cell': {
                justifyContent: 'center',
                padding: 0,
                fontSize: 15,
              },
              '.MuiDataGrid-columnHeader': {
                padding: 0,
                fontSize: 18,
                fontWeight: 'bolder'
              }
            }}
            density='compact'
            rows={row}
            columns={columns}
            disableSelectionOnClick
            disableColumnMenu
            autoHeight
            hideFooter
          />
          <CardActions
            style={{
              display: 'grid'
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                gridRow: 1,
                gridColumn: 1,
                marginLeft: 5
              }}
            >
              More Details
            </div>
            <IconButton
              style={{
                gridRow: 1,
                gridColumn: 8,
                margin: 'auto'
              }}
              onClick={() => {
                setOpen1(!open1);
              }}
            >
              {!open1 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </CardActions>
          <Collapse in={open1}>
            <Card sx={{ minWidth: 275, height: 96, margin: "auto" }}>
              <CardContent>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Total Interest Paid : &#8377; {Int}
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }} color="text.secondary" gutterBottom>
                  Total Balance : &#8377; {(500 * data.length) + parseInt(Total / 11)}
                </Typography>
              </CardContent>
            </Card>
          </Collapse>
        </div>
      </Typography>
      <CardActions
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          size='small'
          variant='contained'
          onClick={() => setfirst(false)}
        >Back</Button>
      </CardActions>
    </React.Fragment >
  );
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose1}
      >
        <Alert
          onClose={handleClose1}
          severity="success"
          sx={{ width: '100%' }}>
          Updated successfully!
        </Alert>
      </Snackbar>
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
              onChange={(e) => setName(e.target.value)}
              style={{ color: "black", backgroundColor: "gray", borderRadius: "15px" }}
            >
              {memberList.map((member) => {
                return (
                  <MenuItem value={member}>{member}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to DELETE these item?"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
              >CANCEL</Button>
              <Button color='error' autoFocus
                onClick={deleteItem}
              >
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <br />
        <Button style={{ display: "block", margin: "auto" }} variant="contained" onClick={calInt}>Get Data</Button>
      </div>
      <Backdrop
        style={{ zIndex: 5 }}
        open={first}
      >
        <Box style={{ width: 410, margin: "auto" }}>
          <Card variant='outlined' style={{ backgroundColor: 'grey' }}>{card}</Card>
        </Box>
      </Backdrop>
    </>
  )
}
export default Member;