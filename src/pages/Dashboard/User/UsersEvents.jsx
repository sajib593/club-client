import React from 'react';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading';

const UsersEvents = () => {

     let axiosInstance = useAxios();
    let {user} = useAuth();
        // console.log(user?.email);

     const { data: userEvents = [], isLoading, isError } = useQuery({
        queryKey: ['userEvents', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/userRegisteredEvents?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    // console.log(userEvents);




    if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Failed to load clubs.</p>;


    return (
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Registered Events ({userEvents.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Event Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {userEvents.map((event, index) => (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.clubName}</td>
                <td>{event.clubId}</td>
                <td>
                  {new Date(event.eventDate).toLocaleDateString()}
                </td>
                <td>
                  <span className="badge badge-success">
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {userEvents.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            You have not registered for any events yet.
          </p>
        )}
      </div>
    </div>
    );
};

export default UsersEvents;