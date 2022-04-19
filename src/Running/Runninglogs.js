import '../style.css';

import React, { useState } from 'react';

import {Detai} from '../Months/Aapi';

const Runninglogs = () => {

    const members = ["Kunj", "Vivek", "Pinal", "Jayen", "Priyal", "Brijesh", "Karan", "Krunal", "Dhaval", "Jeet", "Kelvin"]
    let sum = 0;


    return (
        <>

            <div className="labelMain">Running Loans</div>
            <br></br>

            <div className="column">
            {Detai.map((element) => {



                if (Object.values(element).indexOf("running") >= 0) {
                    return (
                        <>

                                {members.map((elem) => {

                                    const ed = element["dateEnd" + elem]
                                    const sd = element["dateStart" + elem]
                                    const la = element["loanAmount" + elem]
                                    if (ed == "running") {
                                        if (typeof (la) === 'number') {
                                            sum += la;
                                        }
                                    }

                                    return (
                                        <>

                                            {ed == "running" ?
                                                <>

                                                    <div className="activity">


                                                        <div className='mDiv'>
                                                            <div> {`${elem}`}</div>
 
                                                            <div className='lse'>

                                                                <div> {"Loan Amount : " + la}</div>

                                                                <div> {"Loan Start Date : " + sd}</div>

                                                                <div> {"Loan End Date : running"}</div>

                                                            </div>

                                                        </div>


                                                    </div>


                                                </>
                                                : ''}
                                        </>
                                    )


                                })}

                        </>
                    )
                    
                    
                }
            })}


            </div>

            <div className='mDiv'>Total Loaned Amount : <span style={{ color: 'red' }}>{sum}</span></div>


        </>
    )
}

export default Runninglogs