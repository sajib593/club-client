import React from 'react';
import ClubCards from './ClubCards';
import ShowAllEvents from '../Events/ShowAllEvents';
import Banner from './Banner';
import ClubWorks from './ClubWorks';
import WhyJoin from './WhyJoin';

const Home = () => {
    return (
        <div className='mt-10'>

            <Banner></Banner>

            <br /><br /><br />
            
            <ClubCards limit={9}></ClubCards>
            <br /><br />
            <ShowAllEvents limit={5} UpComing={'UpComing'}></ShowAllEvents>

            <br /><br />

            <ClubWorks></ClubWorks>

            <br /><br />

            <WhyJoin></WhyJoin>
        </div>
    );
};

export default Home;