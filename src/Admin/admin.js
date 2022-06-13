import React from 'react';
import { Snackbar } from '@mui/material';
import Login from './login';
const Admin = ({ callback, loggeD }) => {
    const [success, setsuccess] = React.useState();
    const [Error, setError] = React.useState(false);
    const getAprovel = () => {
        callback({ first:true});
    };
    const loginSubmit = React.useCallback(async (state) => {
        await fetch('/login', {
            method: 'post',
            body: JSON.stringify(state),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            response.json().then(
                (dataa) => {
                    setsuccess(dataa.user);
                    localStorage.setItem("code", dataa.code);
                });
            response.status !== 404 && getAprovel();
            response.status === 404 && callback({ first:true});
        }).catch((err) => {
            console.log('err', err);
        });
    }, []);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Error}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Wrong user ID or Password!"
            />
            {!loggeD && <Login login={loginSubmit} />}
        </>
    )
}

export default React.memo(Admin);