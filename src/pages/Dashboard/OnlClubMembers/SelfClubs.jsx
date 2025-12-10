import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../shared/Loading';
import { Link } from 'react-router';

const SelfClubs = () => {

    let axiosSecure = useAxiosSecure();
    let {user} = useAuth();
        // console.log(user?.email);

     const { data: selfClubs = [], isLoading, isError } = useQuery({
        queryKey: ['selfClubs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selfClubs?email=${user?.email}`);
            return res.data;
        }
    });
    console.log(selfClubs);


    if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Failed to load jobs.</p>;

    return (
        <div className="w-full p-4">
  <h2 className="text-3xl font-bold mb-6 text-center">My Clubs</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

    {selfClubs.map(selfClub => (
      <div 
        key={selfClub._id} 
        className="border rounded-xl shadow-md bg-white hover:shadow-lg transition p-4"
      >
        
        {/* Club Image */}
        <img 
          className="w-full h-40 object-cover rounded-lg mb-3"
          src={selfClub.bannerImage}
          alt=""
        />

        {/* Title */}
        <h1 className="text-xl font-bold mb-1">{selfClub.clubName}</h1>

        {/* Category + Location */}
        <div className="flex justify-between text-gray-600 text-sm mb-3 font-bold">
          <span>{selfClub.category}</span>
          <span>{selfClub.location}</span>
        </div>

        {/* Button */}
        <Link to={`/dashboard/createEvents/${selfClub._id}`} className="btn btn-primary w-full">
          Make An Event
        </Link>

      </div>
    ))}

  </div>
</div>

    );
};

export default SelfClubs;








