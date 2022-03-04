import '../style.css';

import React, { useState } from 'react';

import Detai from '../Months/Aapi';

const Activity = ({ yearS, fun }) => {

    const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]




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


                                                            <div className='lseFlex'>
                                                            {el.loanAmount == "0" ? <div style={{ margin:'auto' }}>"No Loan was taken!"</div> : null}
                                                                {el.loanAmountKunj != undefined ?

                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountKunj)]}`.slice(10, 14)}</div>
                                                                        <div>{"Loan : " + el.loanAmountKunj}</div>
                                                                        <div>{"Start Date : " + el.dateStartKunj}</div>
                                                                        <div>{"End Date : " + el.dateEndKunj}</div>
                                                                    </div>

                                                                    : null}
                                                                {el.loanAmountVivek != undefined ?

                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountVivek)]}`.slice(10, 15)}</div>
                                                                        <div>{"Loan : " + el.loanAmountVivek}</div>
                                                                        <div>{"Start Date : " + el.dateStartVivek}</div>
                                                                        <div>{"End Date : " + el.dateEndVivek}</div>
                                                                    </div>

                                                                    : null}
                                                                {el.loanAmountPinal != undefined ?

                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountPinal)]}`.slice(10, 15)}</div>
                                                                        <div>{"Loan : " + el.loanAmountPinal}</div>
                                                                        <div>{"Start Date : " + el.dateStartPinal}</div>
                                                                        <div>{"End Date : " + el.dateEndPinal}</div>
                                                                    </div>

                                                                    : null}
                                                                {el.loanAmountJayen != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountJayen)]}`.slice(10, 15)}</div>
                                                                        <div>{"Loan : " + el.loanAmountJayen}</div>
                                                                        <div>{"Start Date : " + el.dateStartJayen}</div>
                                                                        <div>{"End Date : " + el.dateEndJayen}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountPriyal != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountPriyal)]}`.slice(10, 16)}</div>
                                                                        <div>{"Loan : " + el.loanAmountPriyal}</div>
                                                                        <div>{"Start Date : " + el.dateStartPriyal}</div>
                                                                        <div>{"End Date : " + el.dateEndPriyal}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountBrijesh != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountBrijesh)]}`.slice(10, 16)}</div>
                                                                        <div>{"Loan : " + el.loanAmountBrijesh}</div>
                                                                        <div>{"Start Date : " + el.dateStartBrijesh}</div>
                                                                        <div>{"End Date : " + el.dateEndBrijesh}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountKaran != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountKaran)]}`.slice(10, 15)}</div>
                                                                        <div>{"Loan : " + el.loanAmountKaran}</div>
                                                                        <div> {"Start Date : " + el.dateStartKaran}</div>
                                                                        <div>{"End Date : " + el.dateEndKaran}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountKrunal != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountKrunal)]}`.slice(10, 16)}</div>
                                                                        <div>{"Loan : " + el.loanAmountKrunal}</div>
                                                                        <div>{"Start Date : " + el.dateStartKrunal}</div>
                                                                        <div>{"End Date : " + el.dateEndKrunal}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountDhaval != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountDhaval)]}`.slice(10, 16)}</div>
                                                                        <div>{"Loan : " + el.loanAmountDhaval}</div>
                                                                        <div>{"Start Date : " + el.dateStartDhaval}</div>
                                                                        <div>{"End Date : " + el.dateEndDhaval}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountJeet != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountJeet)]}`.slice(10, 14)}</div>
                                                                        <div>{"Loan : " + el.loanAmountJeet}</div>
                                                                        <div>{"Start Date : " + el.dateStartJeet}</div>
                                                                        <div>{"End Date : " + el.dateEndJeet}</div>
                                                                    </div>
                                                                    : null}
                                                                {el.loanAmountKelvin != undefined ?
                                                                    <div className='lse'>
                                                                        <div className='nameDiv'>{`${Object.keys(el)[Object.values(el).indexOf(el.loanAmountKelvin)]}`.slice(10, 16)}</div>
                                                                        <div>{"Loan : " + el.loanAmountKelvin}</div>
                                                                        <div>{"Start Date : " + el.dateStartKelvin}</div>
                                                                        <div>{"End Date : " + el.dateEndKelvin}</div>
                                                                    </div>
                                                                    : null}
                                                            </div>
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





















export default Activity;