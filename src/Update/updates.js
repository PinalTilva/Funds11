import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
    FormControl,
    OutlinedInput,
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    MenuItem,
    Snackbar,
    Alert
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { grey } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
const Updates = ({ data }) => {
    const date = new Date();
    const [alignment1, setAlignment1] = React.useState('Loan');
    const cDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
    const [currentDate, setcurrentDate] = React.useState(cDate);
    const [mem, setMem] = React.useState('');
    const [put, setPut] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [loanedMem, setLoanedMem] = React.useState([]);
    const [members, setMembers] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [error1, setError1] = React.useState(false);
    const [error2, setError2] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [valueArray, setValueArray] = React.useState([]);
    const [nextLoanId, setNextLoanId] = React.useState();
    const [loanId, setLoanId] = React.useState();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getMemebers = async (e) => {
        let token = localStorage.getItem("code");
        await fetch(('/get/').concat(`${currentDate.slice(0, 7)}`, '/members'), {
            method: 'get',
            headers: {
                'Authorization': `Funds11${token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
        }).then((response) => {
            response.json().then((dataa) => {
                console.log(dataa);
                setLoanedMem(Object.keys(dataa.members2[0]));
                setValueArray(dataa.members2[0]);
                setMembers(dataa.members1);
                setNextLoanId(dataa.loanCount)
            });
        }).catch((err) => {
            console.log('err', err);
        })
    }
    React.useEffect(() => {
        getMemebers();
        let array = [];
        data.map((item) => {
            if (Object.values(item).includes(currentDate.slice(0, 7))) {
                array.push(true);
            };
        });
        array.length !== 0 ? setPut(true) : setPut(false);
    }, [currentDate, data])

    const handleAlignment1 = (
        event,
        newAlignment
    ) => {
        if (newAlignment !== null) {
            setAlignment1(newAlignment);
        }
    };


    const sendData = () => {
        let obj = {};
        if (alignment1 === 'Loan') {
            obj['year'] = currentDate.slice(0, 7);
            if (!checked) {
                if (mem === "" || amount === 0) {
                    mem === "" ? setError1(true) : setError1(false);
                    amount === 0 ? setError2(true) : setError2(false);
                    return;
                }
            };
            obj['loan'] = {}
            if (!put) {
                obj['interest'] = {};
                obj['penalty'] = {};
            }
            if (checked) {
                obj['loan'] = {};
            } else {
                obj['loan'][`${mem}`] = {};
                obj['loan'][`${mem}`]['Amount'] = amount;
                obj['loan'][`${mem}`]['Date'] = currentDate;
                obj['loan'][`${mem}`]['End'] = "Running";
                obj['loan'][`${mem}`]['loanId'] = currentDate.split('-').join('').concat('#', nextLoanId);
            }
        } else {
            obj['interest'] = {};
            obj['interest'][`${mem}`] = {};
            obj['interest'][`${mem}`][loanId] = amount;
        }
        const apiPost = async () => {
            let token = localStorage.getItem("code");
            let array = [];
            await fetch('/add', {
                method: 'post',
                body: JSON.stringify(obj),
                headers: {
                    'Authorization': `Funds11${token}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
            }).then((response) => {
                response.json().then((dataa) => array.push([...dataa]));
                setOpen(true);
                window.location.reload();
            }).catch((err) => {
                console.log('err', err);
            });
        };


        const apiPut = async () => {
            let token = localStorage.getItem("code");
            let array = [];
            await fetch('/update/'.concat(`${currentDate.slice(0, 7)}`), {
                method: 'put',
                headers: {
                    'Authorization': `Funds11${token}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(obj),
            }).then((response) => {
                response.json().then((dataa) => array.push([...dataa]));
                setOpen(true);
                window.location.reload();
            }).catch((err) => {
                console.log('err', err);
            });
        };
        (alignment1 === 'Loan' && !put) ? apiPost() : apiPut();
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}>
                    Updated successfully!
                </Alert>
            </Snackbar>
            <Backdrop
                style={{ zIndex: 5 }}
                open={true}
            >
                <Card style={{ width: '400px' }}>
                    <CardContent>
                        <FormControl style={{ marginBottom: '10px', width: '100%' }} variant="filled">
                            <ToggleButtonGroup
                                value={alignment1}
                                exclusive
                                onChange={handleAlignment1}
                                aria-label="text alignment"
                                style={{ width: '100%' }}
                            >
                                <ToggleButton value="Loan" style={{ width: '50%' }} aria-label="left aligned">
                                    Loans
                                </ToggleButton>
                                <ToggleButton value="Interest" style={{ width: '50%' }} aria-label="right aligned">
                                    Interest
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <br />
                            <FormControl fullWidth size='small'>
                                <OutlinedInput
                                    id="a1"
                                    color='secondary'
                                    type={'date'}
                                    value={currentDate}
                                    style={{ marginBottom: '15px' }}
                                    onChange={(e) => setcurrentDate(e.target.value)}
                                />
                                {alignment1 === "Loan" && <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            sx={{
                                                color: grey[800],
                                                '&.Mui-checked': {
                                                    color: grey[600],
                                                },
                                            }}
                                        />
                                    }
                                    label='No Loan was taken'
                                    onChange={() => {
                                        setChecked(!checked);
                                    }}
                                />}
                                <TextField
                                    required
                                    error={error1}
                                    disabled={checked}
                                    color='secondary'
                                    id="outlined-select-member"
                                    select
                                    label="Select Member"
                                    style={{ marginBottom: '15px' }}
                                    onChange={(e) => {
                                        setMem(e.target.value);
                                        setAmount(valueArray[e.target.value].amount);
                                        setLoanId(valueArray[e.target.value].loanId)
                                    }}
                                >
                                    {
                                        alignment1 === 'Loan' ?
                                            members.map((member) => {
                                                return (
                                                    <MenuItem value={member}>{member}</MenuItem>
                                                )
                                            })
                                            :
                                            loanedMem.map((member) => {
                                                return (
                                                    <MenuItem value={member}>{member}</MenuItem>
                                                )
                                            })
                                    }
                                </TextField>
                                {alignment1 === 'Interest' ?
                                    <TextField
                                        focused
                                        error={error2}
                                        label="Interest Amount"
                                        value={amount}
                                        variant="outlined"
                                        type='tel'
                                        onChange={(e) => setAmount(+e.target.value)}
                                    /> : <TextField
                                        error={error2}
                                        disabled={checked}
                                        label="Loan Amount"
                                        variant="outlined"
                                        type='tel'
                                        onChange={(e) => setAmount(+e.target.value)}
                                    />}
                            </FormControl>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <div style={{ margin: 'auto' }}>
                            <Button
                                variant="contained"
                                style={{ marginRight: '10px' }}
                                onClick={sendData}
                            >
                                {put ? "Update" : "Add"}
                            </Button>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                <Button variant="contained">Cancel</Button>
                            </Link>
                        </div>
                    </CardActions>
                </Card>
            </Backdrop>
        </>
    )
}

export default Updates