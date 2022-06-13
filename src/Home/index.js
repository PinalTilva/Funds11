import React from 'react'
import logo from '../favv.png'
import qr from '../qrcode.png'
const Home = () => {
    return (
        <>

            <div className='homeLogo'>
                <img id='im' src={logo} alt="" />
            </div>
            <div id='homeQR'>
                <a href="https://wa.me/917041142889?text=I%20want%20to%20know%20more%20about%20funds11"><img id='qr' src={qr} alt="" /></a>
            </div>

        </>
    )
}
export default Home;