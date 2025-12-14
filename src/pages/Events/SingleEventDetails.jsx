import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
dayjs.extend(relativeTime);


const SingleEventDetails = () => {

     let axiosInstance = useAxios();
     let {id} = useParams();
    console.log(id);
    let {user} = useAuth();

     let { data: singleEventDetails = {}, isLoading, isError } = useQuery({
        queryKey: ['singleEventDetails'],
        queryFn: async () => {
            let res = await axiosInstance.get(`/singleEventDetails/${id}`);
            return res.data;
        }
    });


    let handleEventRegister=()=>{
       console.log("regis", singleEventDetails);

       let eventRegisterData={

        eventId : singleEventDetails._id,
        userEmail : user?.email,
        clubId : singleEventDetails.clubId,
        clubName : singleEventDetails.title,
        
       }


         axiosInstance.post('/eventRegister', eventRegisterData)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire('register created in the database');
                                }
                                else if (res.data.message ===   "Already registered") {
                                  Swal.fire("You have already registered for this event.");
    }
                            })

    }


    if(isLoading) return<Loading></Loading>
    if (isError) return <p className="text-center text-red-500">Failed to load jobs.</p>;
    // console.log(singleEventDetails);


    

    return (
        <div
         
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">
            {singleEventDetails.title}
          </h2>
          <p className="text-gray-700 mb-2">{singleEventDetails.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
              Event Date: {dayjs(singleEventDetails.eventDate).format("DD MMM YYYY")}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Location: {singleEventDetails.location}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              Fee: ${singleEventDetails.eventFee}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Max Attendees: {singleEventDetails.maxAttendees || "-"}
            </span>
          </div>


      {singleEventDetails?.createdAt && (
  <p className="text-gray-400 text-sm">
    Created {dayjs(singleEventDetails.createdAt).format("DD MMM YYYY, hh:mm A")} (
    {dayjs(singleEventDetails.createdAt).fromNow()})
  </p>

)}
<br />
<button onClick={handleEventRegister} className='btn btn-primary'>Register Please</button>

          

        </div>
    );
};

export default SingleEventDetails;