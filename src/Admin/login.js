import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    
} from '@mui/material';

const details = {
    admin: '',
    password: ''
};
const reducer = (state, action) => {
    switch (action.type) {
        case "ADMIN":
            return { ...state, admin: action.id };
        case "PASSWORD":
            return { ...state, password: action.id };
        default:
            return state;
    }
};

const Login = ({login}) => {

    const [state, dispatch] = React.useReducer(reducer, details);

    return (
        <>
            <Backdrop
                style={{ zIndex: 5 }}
                open={true}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <FormControl style={{ marginBottom: '10px', width: '100%' }} variant="filled">
                            <InputLabel htmlFor="admin">Admin</InputLabel>
                            <OutlinedInput
                                id="admin"
                                type={'text'}
                                onChange={
                                    (event) => {
                                        dispatch({ type: "ADMIN", id: event.target.value });
                                    }
                                }
                            />
                        </FormControl>
                        <FormControl style={{ width: '100%' }} variant="filled">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={'password'}
                                onChange={
                                    (event) => {
                                        dispatch({ type: "PASSWORD", id: event.target.value });
                                    }
                                }
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <div style={{ margin: 'auto' }}>
                            <Button
                                variant="contained"
                                style={{ marginRight: '10px' }}
                                onClick={() => login(state)}
                            >
                                Login
                            </Button>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                <Button variant="contained">Back</Button>
                            </Link>
                        </div>
                    </CardActions>
                </Card>
            </Backdrop>
        </>
    )
}

export default Login;