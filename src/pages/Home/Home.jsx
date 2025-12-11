import React from 'react';
import ClubCards from './ClubCards';
import ShowAllEvents from '../Events/ShowAllEvents';

const Home = () => {
    return (
        <div>
            
            <ClubCards></ClubCards>
            <br /><br />
            <ShowAllEvents limit={5} UpComing={'UpComing'}></ShowAllEvents>
        </div>
    );
};

export default Home;