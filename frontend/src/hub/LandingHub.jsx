import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const LandingHub = () => {
    return (
        <div className='h-[100vh] overflow-hidden  '>
            <div className=" h-[10vh] ">

                <Header />
            </div>
            <div className=" h-[85vh] ">

                <Outlet />
            </div>


            <div className=" h-[5vh] bg-black ">

                <Footer />
            </div>

        </div>
    );
};

export default LandingHub;