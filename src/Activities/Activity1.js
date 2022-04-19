import '../style.css';
import React from 'react';
import { memeberList, months } from '../Months/Aapi';
import { Card, Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const Activity1 = ({ yearS, fun }) => {



    return (
        <>
            <div className="labelMain">Activity</div>
            <br></br>
            <button className='btn1' onClick={() => { fun() }}>Get logs</button>
            {yearS.map((elm) => {

                return (
                    <>
                        <div className='activity1'>

                            {[elm].map((elem) => {
                                return (
                                    <>
                                        <div className='red'>{elm[0].year.slice(0, 4)}</div>
                                        <div className="column">

                                            {elem.map((el) => {
                                                return (
                                                    <>
                                                        <div className='mDiv'>
                                                            <div className='mmDiv'>{months[el.year.slice(5, 6) == "0" ? el.year.slice(6, 7) : el.year.slice(5, 7)]}</div>
                                                            <Card style={{ display: "flex", flexWrap: "wrap" }} variant='filled'>
                                                                {el.loanAmount == "0" ? <div style={{ margin: 'auto' }}>"No Loan was taken!"</div> : null}
                                                                {
                                                                    memeberList.map((member) => {
                                                                        let lm = "loanAmount" + `${member}`
                                                                        let ds = "dateStart" + `${member}`
                                                                        let es = "dateEnd" + `${member}`
                                                                        console.log(el[ds])
                                                                        const card = (
                                                                            <React.Fragment>
                                                                                <CardContent>
                                                                                    <Typography sx={{ fontSize: 14, fontWeight:"bolder" }} color="text.secondary" gutterBottom>
                                                                                        {member}
                                                                                    </Typography>
                                                                                    <Typography sx={{ fontSize: 12, fontWeight:"bold" }} color="text.secondary" gutterBottom>
                                                                                        Loan : {el[lm]}
                                                                                    </Typography>
                                                                                    <Typography sx={{ fontSize: 12, fontWeight:"bold" }} color="text.secondary" gutterBottom>
                                                                                        Start Date : {el[ds]}
                                                                                    </Typography>
                                                                                    <Typography sx={{ fontSize: 12, fontWeight:"bold" }} color="text.secondary" gutterBottom>
                                                                                        End Date : {el[es]}
                                                                                    </Typography>
                                                                                </CardContent>
                                                                            </React.Fragment>
                                                                        );
                                                                        return (
                                                                            <>
                                                                                {el[lm] != undefined ?
                                                                                    <Box style={{ maxWidth: 200, margin: "auto" }}>
                                                                                        <Card style={{ fontWeight:"bold" }} variant='filled'>{card}</Card>
                                                                                    </Box>
                                                                                    : null
                                                                                }
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </Card>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </>
                )
            })}
        </>
    )
}





















export default Activity1;