import React, { useState } from 'react'

import App from '../App.js';
import Detai from '../Months/Aapi';

const Table1 = ({ det, tab, fun }) => {

    return (
        <>
            {det.map((crE) => {
                return (
                    <>
                        <div className={`${tab}`}>
                            
                            <div className="cancel" onClick={fun}>
                                <span></span>
                                <span></span>
                            </div>
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
                                        </tr><tr><td className="name">Kunj</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountKunj}</td>
                                            <td>{crE.dateStartKunj}</td>
                                            <td>{crE.dateEndKunj}</td>
                                            <td id="inkunj">{crE.interestKunj}</td>
                                            <td>{crE.penaltyKunj}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Vivek</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountVivek}</td>
                                            <td>{crE.dateStartVivek}</td>
                                            <td>{crE.dateEndVivek}</td>
                                            <td id="invivek">{crE.interestVivek}</td>
                                            <td>{crE.penaltyVivek}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Pinal</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountPinal}</td>
                                            <td>{crE.dateStartPinal}</td>
                                            <td>{crE.dateEndPinal}</td>
                                            <td id="inpinal">{crE.interestPinal}</td>
                                            <td>{crE.penaltyPinal}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Jayen</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountJayen}</td>
                                            <td>{crE.dateStartJayen}</td>
                                            <td>{crE.dateEndJayen}</td>
                                            <td id="injayen">{crE.interestJayen}</td>
                                            <td>{crE.penaltyJayen}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Priyal</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountPriyal}</td>
                                            <td>{crE.dateStartPriyal}</td>
                                            <td>{crE.dateEndPriyal}</td>
                                            <td id="inpriyal">{crE.interestPriyal}</td>
                                            <td>{crE.penaltyPriyal}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Brijesh</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountBrijesh}</td>
                                            <td>{crE.dateStartBrijesh}</td>
                                            <td>{crE.dateEndBrijesh}</td>
                                            <td id="inbrijesh">{crE.interestBrijesh}</td>
                                            <td>{crE.penaltyBrijesh}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Karan</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountKaran}</td>
                                            <td>{crE.dateStartKaran}</td>
                                            <td>{crE.dateEndKaran}</td>
                                            <td id="inkaran">{crE.interestKaran}</td>
                                            <td>{crE.penaltyKaran}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Krunal</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountKrunal}</td>
                                            <td>{crE.dateStartKrunal}</td>
                                            <td>{crE.dateEndKrunal}</td>
                                            <td id="inkrunal">{crE.interestKrunal}</td>
                                            <td>{crE.penaltyKrunal}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Dhaval</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountDhaval}</td>
                                            <td>{crE.dateStartDhaval}</td>
                                            <td>{crE.dateEndDhaval}</td>
                                            <td id="indhaval">{crE.interestDhaval}</td>
                                            <td>{crE.penaltyDhaval}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Jeet</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountJeet}</td>
                                            <td>{crE.dateStartJeet}</td>
                                            <td>{crE.dateEndJeet}</td>
                                            <td id="injeet">{crE.interestJeet}</td>
                                            <td>{crE.penaltyJeet}</td>
                                            <td></td>
                                        </tr><tr><td className="name">Kelvin</td>
                                            <td>500</td>
                                            <td>{crE.loanAmountKelvin}</td>
                                            <td>{crE.dateStartKelvin}</td>
                                            <td>{crE.dateEndKelvin}</td>
                                            <td id="inkelvin">{crE.interestKelvin}</td>
                                            <td>{crE.penaltyKelvin}</td>
                                            <td></td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )
            })}






        </>
    )
}

export default Table1;