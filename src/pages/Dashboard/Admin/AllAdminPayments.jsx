import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllAdminPayments = () => {

    let axiosSecure = useAxiosSecure();

   const {
    data: allPayments = [], isLoading, isError} = useQuery({
    queryKey: ['allPayments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allAdminPayments');
      return res.data;
    },
  });


  const totalPayment = allPayments.reduce((sum, payment) => sum + payment.amount, 0);


   if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load payments</p>;

  

console.log(allPayments);

    return (
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        All Payments ({allPayments.length})
      </h2>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Total Payments: {totalPayment} USD
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>User Email</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Club Name</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {allPayments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>

                <td>
                  {payment.userEmail ? payment.userEmail : "N/A"}
                </td>

                <td>
                  {payment.amount} {payment.currency?.toUpperCase()}
                </td>

                <td>
                  <span className="badge badge-primary">
                    {payment.membershipId ? "Membership" : "Event"}
                  </span>
                </td>

                <td>{payment.clubName}</td>

                <td>
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllAdminPayments;