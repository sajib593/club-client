import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../../shared/Loading';
import dayjs from 'dayjs';
import { Link } from 'react-router';

const ShowAllEvents = ({limit, UpComing}) => {

    let axiosInstance = useAxios();
    let [search, setSearch] = useState('');
     const [sort, setSort] = useState('');

     let { data: showAllEvents = [], isLoading, isError } = useQuery({
        queryKey: ['ShowAllEvents', limit, search, sort],  
        
        queryFn: async () => {
          let url = limit ? `/showAllEvents?limit=${limit}&search=${search}&sort=${sort}` : `/showAllEvents?search=${search}&sort=${sort}`;
            let res = await axiosInstance.get(url);
            return res.data;
        }
    });

    if(isLoading) return<Loading></Loading>
    if (isError) return <p className="text-center text-red-500">Failed to load jobs.</p>;
    // console.log(showAllEvents);

    return (
        <div className="p-6">
      
        <div className='flex'>

         <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search clubs..."
        className="input input-bordered mb-5 block mx-auto"
      />



        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Sort by Fee</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>


        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          {UpComing? `${UpComing} Events` : 'All Events'}
        
      </h2>     

    

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              
              <th className="py-3 px-6 text-left">Event Date</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Fee</th>
              <th className="py-3 px-6 text-left">Max Attendees</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {showAllEvents.map((event) => (
              <tr
                key={event._id}
                className="border-b hover:bg-indigo-50 transition-all duration-200"
              >
                <td className="py-3 px-6">{event.title}</td>
                
                <td className="py-3 px-6">
                  {dayjs(event.eventDate).format("DD MMM YYYY")}
                </td>
                <td className="py-3 px-6">{event.location}</td>
                <td className="py-3 px-6">${event.eventFee}</td>
                <td className="py-3 px-6">{event.maxAttendees || "-"}</td>
                
                <td>
                    <Link to={`/dashboard/singleEventDetails/${event._id}`} className='btn btn-accent'>See Details</Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ShowAllEvents;



// SingleEventDetails  