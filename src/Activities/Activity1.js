import '../style.css';
import React from 'react';
import { months } from '../Months/Aapi';
import { Card, Box, Accordion, AccordionSummary, AccordionDetails, TextField, FormControl, Divider, Chip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { useLocation, Link } from 'react-router-dom';
const Activity1 = ({ data }) => {
    const [Data, setData] = React.useState([]);

    React.useEffect(() => {
        data && setData(data);
    }, [data]);

    const year = React.useRef('Kuch bhi')
    return (
        <>
            <div className="labelMain" id='Hii'>Activity</div>
            <br></br>
            <Box
                component={'div'}
                sx={{
                    width: '90%',
                    maxWidth: 700,
                    backgroundColor: 'transparent',
                    margin: 'auto',
                }}
            >

                {
                    Data.length > 0 && Data.map((element) => {
                        if (element["year"].slice(0, 4) !== year.current) {
                            year.current = element['year'].slice(0, 4)
                            return (
                                <>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography
                                                component={'div'}
                                                style={{ fontWeight: 'bolder', margin: 'auto' }}
                                            >
                                                {year.current}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {data.map((element1) => {
                                                if (element1["year"].slice(0, 4) === year.current) {
                                                    return (
                                                        <>
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={Object.keys(element1["loan"]).length === 0 ? <ExpandMore style={{ opacity: 0 }} /> : <ExpandMore />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography
                                                                        component={'div'}
                                                                        style={{ fontWeight: 'bold', margin: 'auto' }}
                                                                    >
                                                                        {months[+(element1['year'].slice(5, 7))]}
                                                                    </Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Card style={{ display: "flex", flexWrap: "wrap" }} variant='filled'>
                                                                        {Object.keys(element1["loan"]).length === 0 ? <div style={{ margin: 'auto' }}>"No Loan was taken!"</div> : null}
                                                                        {
                                                                            Object.entries(element1['loan']).map((member) => {
                                                                                const card = (
                                                                                    <React.Fragment>
                                                                                        <CardContent>
                                                                                            <Typography sx={{ fontSize: 15, fontWeight: "bolder" }} color="text.secondary" gutterBottom>
                                                                                                {member[0]}
                                                                                            </Typography>

                                                                                            {
                                                                                                !Object.keys(member[1]).includes("Settled") ?

                                                                                                    <Typography sx={{ fontSize: 15, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                                                                                        Loan : &#8377; {member[1]['Amount']}
                                                                                                    </Typography>

                                                                                                    :
                                                                                                    <>
                                                                                                    <Accordion>
                                                                                                        <AccordionSummary
                                                                                                            expandIcon={<ExpandMoreIcon />}
                                                                                                            aria-controls="panel1a-content"
                                                                                                            style={{ backgroundColor: 'transparent' }}
                                                                                                        >
                                                                                                            <Typography sx={{ fontSize: 15, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                                                                                                Loan : &#8377; {member[1]['Amount']}
                                                                                                            </Typography>
                                                                                                        </AccordionSummary>
                                                                                                        <AccordionDetails>
                                                                                                            <Divider>
                                                                                                                <Chip label="Settlements" />
                                                                                                            </Divider>
                                                                                                            <br/>
                                                                                                            <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                                                                                                {Object.entries(member[1]["Settled"]).map((items) => {
                                                                                                                    return (
                                                                                                                        <>
                                                                                                                            &#8377; {items[1] + ' @ ' + items[0]}
                                                                                                                        </>
                                                                                                                    )

                                                                                                                })}

                                                                                                            </Typography>

                                                                                                        </AccordionDetails>
                                                                                                    </Accordion>
                                                                                                    <br />
                                                                                                    </>
                                                                                            }



                                                                                            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                                                                                Start Date : {+(member[1]["Date"]).slice(-2) + " " + months[+member[1]["Date"].slice(5, 7)]}
                                                                                            </Typography>
                                                                                            <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                                                                                End Date : {member[1]["End"] !== "Running" ? +(member[1]["End"]).slice(-2) + " " + months[+member[1]["End"].slice(5, 7)] : "Running"}
                                                                                            </Typography>
                                                                                        </CardContent>
                                                                                    </React.Fragment>
                                                                                );


                                                                                return (
                                                                                    <>
                                                                                        {
                                                                                            <Box style={{ maxWidth: 200, margin: "auto" }}>
                                                                                                <Card
                                                                                                    id={element1['year'] + member}
                                                                                                    style={{ fontWeight: "bold" }}
                                                                                                    variant='filled'>
                                                                                                    {card}
                                                                                                </Card>
                                                                                            </Box>
                                                                                        }
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Card>

                                                                </AccordionDetails>

                                                            </Accordion>
                                                        </>
                                                    )
                                                }
                                            })}
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            )
                        }
                    })
                }
            </Box>
        </>
    )
}





















export default Activity1;