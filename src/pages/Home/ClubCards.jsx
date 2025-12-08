import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading';
import { motion } from "motion/react"
import { Link } from 'react-router';

const ClubCards = () => {


    let axiosInstance = useAxios()

     const { data: clubs = [], isLoading, isError } = useQuery({
        queryKey: ['allClubs'],
        queryFn: async () => {
            const res = await axiosInstance.get('/allClubs');
            return res.data;
        }
    });


    if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Failed to load jobs.</p>;



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {
                clubs.map(club =>
                     <motion.div
                      key={club._id}

                      initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1.8,
                scale: { type: "spring", visualDuration: 0.9, bounce: 0.5 },
            }}

                       className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">



    

      
     

      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 bg-amber-50">
        
       

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {club.clubName}
        </h3>

        {/* Meta info */}
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap- font-bold">
            
            <span>{club.category}</span>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <h2>Fee</h2>
            <span>{club.membershipFee}</span>
          </div>
         
        </div>

        {/* Price & Button */}

        

        <div className="flex items-center justify-between">
         

          <Link to={`/allClubs/${club._id}`} className="bg-white border border-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition">
            Be a Member of <span className='text-xl font-bold text-cyan-500'>{club.clubName}</span>
          </Link>
        </div>
      </div>
    </motion.div>
                )
            }

        </div>
    );
};

export default ClubCards;