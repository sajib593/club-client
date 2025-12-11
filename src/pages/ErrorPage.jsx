import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <><title>Error</title>

        <div className='flex flex-col justify-center items-center min-h-screen'>
            <img className='w-96' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPBuxmi4ZuZtcqpZC0ipa-5mwlpJbXmDQotQ&s" alt="" />

            <h2 className='text-4xl text-red-600'>No page found</h2>
            <br />

            <h2 className='text-2xl'>Go to <Link className='text-3xl text-red-400 btn btn-error text-white' to='/'>Home</Link></h2>
        </div>

        </>
    );
};

export default ErrorPage;