import '../style.css'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import { ExpandMore, Create } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { months } from '../Months/Aapi.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  Input,
  Button,
  CardContent,
  Typography,
  Divider,
  Chip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardActions,
  Badge,
  Tooltip,
  Backdrop,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
  Collapse,
  CardHeader,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import getDuration from '../Functions/getDuration';
import dateConvert from '../Functions/dateConverter';

const Months = ({ data, loggeD }) => {

  const currentD = (new Date()).toISOString().slice(0, 7);
  const currentDate = (new Date()).toISOString().slice(0, 10);
  const [data1, setData] = useState(data);
  const [date, setDate] = useState(currentD);
  const [first, setfirst] = useState(false);
  const [param, setParam] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [open1, setOpen1] = useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      headerAlign: 'center',
      flex: !loggeD && 1,
      width: loggeD && 80,
      sortable: false,
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      headerAlign: 'center',
      flex: !loggeD && 0.8,
      width: loggeD && 80,
      sortable: false,
      renderCell: (params) => (
        <strong>
          {params.value}
        </strong>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      headerAlign: 'center',
      flex: !loggeD && 0.8,
      width: loggeD && 80,
      sortable: false,
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
      width: loggeD && 70,
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
      width: loggeD && 70,
      sortable: false,
      renderCell: (params) => (
        <div>
          {params.value === 'Running' ?
            <strong>
              {params.value}
            </strong>
            : <Tooltip title={params.value.year} >
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
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      flex: !loggeD && 0.8,
      width: loggeD && 80,
      sortable: false,
      hide: loggeD ? false : true,
      renderCell: (params) => (
        <div>
          <Tooltip title='Edit'>
            <Create color='primary' />
          </Tooltip>
          <Tooltip title='Delete' style={{ marginLeft: 5 }}>
            <DeleteForeverIcon
              color='error'
              onClick={() => { setOpenDialog(true); setParam(params.row) }}
            />
          </Tooltip>
        </div>
      )
    },
  ];

  React.useEffect(() => {
    setData(data);
  }, [data]);

  const getMonth = async () => {
    await data.map((month) => {
      if (month['year'] === date) {
        setData(month);
      }
    })
    setfirst(true);
  };

  const row = [];
  const columnsInt = [{
    field: 'id',
    headerName: 'id',
    headerAlign: 'center',
    flex: 1,
    sortable: false,
    hide: true
  }];
  const rowInt = [];

  data && data.map((item) => {
    var loanId;
    if (item.year === date) {
      let obj1 = {};
      Object.entries(item.interest).map((int, ind) => {
        let objInt = {
          headerAlign: 'center',
          flex: 1,
          sortable: false,
        };
        obj1.id = rowInt.length + 1;
        obj1[int[0]] = Object.values(int[1])[0]
        objInt.field = int[0];
        objInt.headerName = int[0];
        columnsInt.push(objInt);
      });
      rowInt.push(obj1);
      Object.entries(item.loan).map((loans) => {
        const obj = {};
        loanId = loans[1]['loanId'];
        obj.id = row.length + 1;
        obj.year = item.year;
        obj.name = loans[0];
        obj.loanId = loans[1]['loanId'];
        obj.amount = {};
        obj.amount.amount = loans[1].Amount;
        obj.amount.duration = getDuration(loans[1].Date, loans[1].End);
        obj.date = {};
        obj.date.fullDate = dateConvert(loans[1].Date).props.children;
        obj.date.year = (loans[1].Date).slice(0, 4);
        obj.end = {};
        if (loans[1].End !== 'Running') {
          obj.end.fullDate = dateConvert(loans[1].End).props.children;
          obj.end.year = (loans[1].End).slice(0, 4);
        } else {
          obj.end = dateConvert(loans[1].End).props.children;
        };
        row.push(obj);

      })
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
  };

  const card = (
    <React.Fragment>
      <br />
      <Typography variant="h4" component="div">
        <Divider>
          <Chip
            label={dateConvert(data1.year)}
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
        <div
          style={{
            width: '95%',
            margin: 'auto',
            backgroundColor: 'white',
            borderRadius: 5,
          }}
        >
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
              Interest
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
              rows={rowInt}
              columns={columnsInt}
              disableSelectionOnClick
              disableColumnMenu
              autoHeight
              hideFooter
            />
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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
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
      <br />
      <br />
      <div className="labelMain">Select Month:</div>
      <br />
      <div className="diss">
        <Box
          style={{
            maxWidth: 280,
            display: "block",
            margin: "auto"
          }}>
          <Input
            id='input'
            inputProps={{ max: currentDate, min: "2020-12" }}
            defaultValue={currentD}
            type='month'
            onChange={(e) => setDate(e.target.value)}
            style={{
              backgroundColor: "gray",
              width: "100%",
              borderRadius: "15px",
              padding: "5px 10px 5px 10px"
            }}
          >
          </Input>
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
                variant='contained'
              >
                CANCEL
              </Button>
              <Button color='error' autoFocus
                onClick={deleteItem}
                variant='contained'
              >
                DELETE
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <br></br>
        <Button
          style={{
            display: "block",
            margin: "auto"
          }}
          variant="contained"
          onClick={() => getMonth()}
        >
          Get Data
        </Button>
      </div>
      <Backdrop
        style={{ zIndex: 5 }}
        open={first}
      >
        <Box
          style={{
            width: 410,
            margin: "auto"
          }}
        >
          <Card
            variant='outlined'
            style={{ backgroundColor: 'grey' }}
          >
            {card}
          </Card>
        </Box>
      </Backdrop>
    </>
  )
}

export default Months;