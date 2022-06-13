import '../style.css';
import {
    Box, Card, CardContent, Chip, Typography,
    TextField, FormControl, Snackbar, IconButton, 
    Button, Alert, Divider, Collapse, CardActions
} from '@mui/material';
import React from 'react';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const Runninglogs = ({ logged, data }) => {
    let sum = 0;
    const ArrayOpen1 = {};
    const ArrayOpen2 = {};
    const Array1 = [];
    let datE = (new Date()).toISOString().slice(0, 10);
    const [settleAmount, setSettleAmount] = React.useState(null);
    const [Data, setData] = React.useState([]);
    const ArrayOpen = {};

    React.useEffect(() => {
        setData(data)
    }, [data])

    Data.length > 0 && Data.forEach((element) => {
        if (Object.values(element['loan']).length > 0) {
            let Array = Object.entries(element['loan'])
            Array.forEach((item) => {
                if (Object.values(item[1]).includes("Running")) {
                    item.push(element['year']);
                    sum += item[1]["Amount"];
                    Array1.push(item);
                    ArrayOpen[element['year'] + item[0]] = false;

                }
            })
        }
    })

    Array1.map((item, index) => {
        let ind = '' + index
        ArrayOpen1[ind] = false;
        ArrayOpen2[ind] = 0
    })

    const [Acc, setArr] = React.useState(ArrayOpen1);
    const [Acc1, setArr1] = React.useState(ArrayOpen2);
    const [open, setOpen] = React.useState(false);
    const sendData = async (item) => {
        let token = localStorage.getItem("code");
        await fetch('/update_loans', {
            method: 'put',
            headers: {
                'Authorization': `Funds11${token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(item),
        }).then((response) => {
            response.json();
            setOpen(true);
            window.location.reload();
        })
            .catch((err) => {
                console.log('err', err);
            });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    const getDuration = (prop) => {
        let year = datE.slice(0, 4) - prop.slice(0, 4);
        let months = datE.slice(5, 7) - prop.slice(5, 7);
        let days = datE.slice(8, 10) - prop.slice(8, 10);
        if (Math.sign(months) === -1) {
            let totalMonths = 12 + months
            let string = `${totalMonths}` + ' months ' + `${days}` + ' days '
            if (Math.sign(days) === -1) {
                let daysInMonth1 = +daysInMonth(+prop.slice(5, 7), prop.slice(0, 4)) - (+prop.slice(8, 10))
                days = +datE.slice(8, 10) + daysInMonth1
                string = `${totalMonths}` + ' months ' + `${days}` + ' days'
                if (year - 1 > 0) {
                    string = `${year - 1}` + ' year ' + `${totalMonths}` + ' months ' + `${days}` + ' days'
                }
                return string
            }
            if (year - 1 > 0) {
                string = `${year - 1}` + ' year ' + `${totalMonths}` + ' months ' + `${days}` + ' days'
            }
            return string
        } else {
            let string = `${months}` + ' months ' + `${days}` + ' days '
            if (Math.sign(days) === -1) {
                let daysInMonth1 = +daysInMonth(+prop.slice(5, 7), prop.slice(0, 4)) - (+prop.slice(8, 10))
                days = +datE.slice(8, 10) + daysInMonth1
                string = `${months - 1}` + ' months ' + `${days}` + ' days'
                if (year - 1 > 0) {
                    string = `${year - 1}` + ' year ' + `${months - 1}` + ' months ' + `${days}` + ' days'
                }
                return string
            }
            if (year > 0) {
                string = `${year}` + ' year ' + `${months}` + ' months ' + `${days}` + ' days '
            }
            return string
        }
    }

    return (
        <>
            <div className="labelMain">Running Loans</div>
            <br></br>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}>
                    Updated successfully!
                </Alert>
            </Snackbar>
            <Box
                component={'div'}
                style={{ margin: 'auto', maxWidth: 700, display: "flex", flexWrap: "wrap" }}
            >
                {
                    Array1.map((item, index) => {
                        return (
                            <>
                                <Card
                                    style={{ margin: 'auto', display: 'block', width: 300, marginBottom: 10 }}
                                >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.dark" gutterBottom>
                                            <Chip label={item[0]} />
                                        </Typography>
                                        <Typography variant='h5' component='div' style={{ fontWeight: 'bold' }}>
                                            Loan Amount :   &#8377;  {item[1]['Amount']}
                                        </Typography>
                                        <Typography variant='body2'>
                                            Loan Start Date :  {item[1]['Date']}
                                        </Typography>
                                        <Typography variant='body2'>
                                            Duration :  <Chip size='small' style={{ fontWeight: 'bold', color: 'purple' }} label={getDuration(item[1]['Date'])} />
                                        </Typography>
                                    </CardContent>

                                    {logged &&
                                        <>
                                            <CardActions
                                                style={{
                                                    display: 'grid'
                                                }}
                                            >
                                                <IconButton
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        gridRow: 1,
                                                        gridColumn: 5,
                                                        margin: 'auto'
                                                    }}
                                                >
                                                    <div className='running'>
                                                        Edit
                                                    </div>
                                                </IconButton>
                                                <IconButton
                                                    style={{
                                                        gridRow: 1,
                                                        gridColumn: 8,
                                                        margin: 'auto'
                                                    }}
                                                    onClick={() => {
                                                        ArrayOpen1[index] = !(Acc[index]);
                                                        setArr(ArrayOpen1);
                                                    }}
                                                >
                                                    {!Acc[index] ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                                                </IconButton>
                                            </CardActions>


                                            <Collapse in={Acc[index]} timeout="auto" unmountOnExit>
                                                <div
                                                    style={{
                                                        width: '90%',
                                                        margin: 'auto',
                                                        paddingBottom: 10
                                                    }}
                                                >
                                                    <FormControl style={{ width: '85%', display: 'inline-block' }}>
                                                        <TextField
                                                            label="Settled Amount"
                                                            color="secondary"
                                                            size='small'
                                                            focused
                                                            type='number'
                                                            value={Acc1[index]}
                                                            onChange={(e) => {
                                                                setSettleAmount(+e.target.value);
                                                                ArrayOpen2[index] = e.target.value;
                                                                setArr1(ArrayOpen2);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <IconButton
                                                        onClick={() => {
                                                            Acc1[index] === 0 ? ArrayOpen2[index] = item[1]['Amount'] : ArrayOpen2[index] = 0;
                                                            setArr1(ArrayOpen2);
                                                        }}
                                                    >
                                                        {Acc1[index] !== 0 ? <CheckCircleOutlinedIcon /> : <CircleOutlinedIcon />}
                                                    </IconButton>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Button
                                                            variant="contained"
                                                            style={{ display: 'block', margin: 'auto' }}
                                                            onClick={() => {
                                                                (settleAmount > 0 && (settleAmount !== item[1]['Amount'])) ? item.push('Settled') : (item.length = 3);
                                                                item.includes('Settled') && (item[1]['Amount'] = settleAmount);
                                                                sendData(item);
                                                            }}
                                                        >
                                                            Update
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        </>
                                    }
                                </Card>
                                <br />
                            </>
                        )
                    })
                }
            </Box>
            <Card
                style={{ margin: 'auto', display: 'block', width: 300 }}
                id='card'
            >
                <CardContent>
                    <Typography color="text.dark" gutterBottom>
                        <Divider>
                            <Chip
                                className='running'
                                style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
                                label={'Total'}
                            />
                        </Divider>
                    </Typography>
                    <Typography variant='h5' component='div' style={{ fontWeight: 'bold' }}>
                        {'Loan Amount : '}  &#8377;  {sum}
                    </Typography>
                </CardContent>
            </Card>
            <br />
        </>
    )
}

export default Runninglogs


