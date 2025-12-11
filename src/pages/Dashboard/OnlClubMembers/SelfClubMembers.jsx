import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../shared/Loading';

const SelfClubMembers = () => {


    let {user} = useAuth();
    let axiosSecure = useAxiosSecure();

    const { data : selfClubMembers, isLoading } = useQuery({
  queryKey: ["selfClubMembers", user?.email],
  enabled: !!user?.email,
  queryFn: async () => {
    const res = await axiosSecure.get(`/manager/${user?.email}/members`);
    return res.data;
  }
});

console.log(selfClubMembers);


if(isLoading) return <Loading></Loading>

const { clubs = [], members = [] } = selfClubMembers || {};

    // group members by clubId
    const groupedMembers = clubs.map(club => {
        const clubMembers = members.filter(m => m.clubId === club._id.toString());
        return { club, clubMembers };
    });

    return (
         <div className="p-5">
            <h2 className="text-3xl font-bold mb-5">My Club Members</h2>

            {/* Loop through each club */}
            {groupedMembers.map(({ club, clubMembers }) => (
                <div key={club._id} className="mb-10 p-5 border rounded-lg shadow bg-base-100">

                    <h3 className="text-2xl font-bold text-primary">{club.clubName}</h3>
                    <p className="font-semibold mb-3">Total Members: {clubMembers.length}</p>

                    {/* If no members */}
                    {clubMembers.length === 0 ? (
                        <p className="text-gray-500 italic">No members yet.</p>
                    ) : (
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Joined At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clubMembers.map((m, index) => (
                                    <tr key={m._id}>
                                        <td>{index + 1}</td>
                                        <td>{m.user?.displayName}</td>
                                        <td>{m.user?.email}</td>
                                        <td className="font-semibold">{m.status}</td>
                                        <td>{new Date(m.joinedAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SelfClubMembers;