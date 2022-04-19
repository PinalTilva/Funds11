import React from 'react'
import { memeberList } from './Aapi';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';

const Table = ({ det, tab, fun }) => {

    return (
        <>
            {det.map((crE) => {
                return (
                    <>
                        <div className={`${tab}`}>
                            <Box style={{ maxWidth: 680, margin: "auto" }}>
                                <CancelIcon style={{ color: "red",position:"relative", left:"90%" }} onClick={fun} />
                                <div id='tablediv' >
                                    <table id='tbl' >
                                        <tbody>
                                            <tr><th rowSpan="2" className="name">Name</th>
                                                <th rowSpan="2">EMI</th>
                                                <th colSpan="3">Loan {crE.year}</th>
                                                <th rowSpan="2">Interest</th>
                                                <th rowSpan="2">Penalty</th>
                                                <th rowSpan="2">Total <br></br> Deposit</th>
                                            </tr><tr><td>Amount</td>
                                                <td>D<sup>s</sup></td>
                                                <td>D<sup>e</sup></td>
                                            </tr>
                                            {
                                                memeberList.map((member) => {
                                                    let lm = "loanAmount" + `${member}`
                                                    let ds = "dateStart" + `${member}`
                                                    let de = "dateEnd" + `${member}`
                                                    let ii = "interest" + `${member}`
                                                    let pp = "penalty" + `${member}`
                                                    let id = "in" + `${member}`
                                                    return (
                                                        <tr>
                                                            <td className="name">{member}</td>
                                                            <td>500</td>
                                                            <td>{crE[lm]}</td>
                                                            <td>{crE[ds]}</td>
                                                            <td>{crE[de]}</td>
                                                            <td id={id}>{crE[ii]}</td>
                                                            <td>{crE[pp]}</td>
                                                            <td></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </Box>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default Table;