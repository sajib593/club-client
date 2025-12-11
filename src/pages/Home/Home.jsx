import React from 'react';
import ClubCards from './ClubCards';
import ShowAllEvents from '../Events/ShowAllEvents';

const Home = () => {
    return (
        <div className='mt-10'>
            
            <ClubCards limit={9}></ClubCards>
            <br /><br />
            <ShowAllEvents limit={5} UpComing={'UpComing'}></ShowAllEvents>
        </div>
    );
};

export default Home;