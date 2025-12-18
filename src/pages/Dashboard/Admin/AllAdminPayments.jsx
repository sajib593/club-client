import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../shared/Loading';


const AllAdminPayments = () => {

    let axiosSecure = useAxiosSecure();
    let {user, loading} = useAuth();

   const {
    data: allPayments = [], isLoading, isError} = useQuery({
    queryKey: ['allPayments'],
    enabled: !loading && !!user, // 🔥 WAIT until user ready
    queryFn: async () => {
      const res = await axiosSecure.get('/allAdminPayments');
      return res.data;
    },
  });


  const totalPayment = allPayments.reduce((sum, payment) => sum + payment.amount, 0);


   if (isLoading) return <div className="flex items-center justify-center h-screen">
      <progress className="progress w-56"></progress> </div>

      
  if (isError)
    return <p className="text-center text-red-500">Failed to load payments</p>;

   // 🔹 Club-wise total payment (for chart)
  const chartData = Object.values(
    allPayments.reduce((acc, payment) => {
      if (!acc[payment.clubName]) {
        acc[payment.clubName] = {
          clubName: payment.clubName,
          amount: 0
        };
      }
      acc[payment.clubName].amount += payment.amount;
      return acc;
    }, {})
  );


  if (loading) return <Loading></Loading>;

// console.log(allPayments);

    return (
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        All Payments ({allPayments.length})
      </h2>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Total Payments: {totalPayment} USD
      </h2>

       {/* 🔥 Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Club-wise Payment Summary
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="clubName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>




      {/* 🔹 Table Section */}
      <br /><br />

      <h1 className='text-3xl font-bold text-center'>See All Payment History</h1>
      <br />
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