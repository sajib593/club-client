import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../shared/Loading";


const UserPaymentHistory = () => {


     let axiosInstance = useAxios();
    let {user} = useAuth();
        // console.log(user?.email);

     const { data: userPayments = [], isLoading, isError } = useQuery({
        queryKey: ['userPayments', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/userPaymentHistory/?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    // console.log(userPayments);

    const totalPaid = userPayments.reduce((sum, payment) => sum + payment.amount,  0
);


    if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Failed to load clubs.</p>;



    return (
        

         <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Payment History ({userPayments.length})
      </h2>
      <h2 className="text-2xl font-bold mb-4">
        My Total Payment is : {totalPaid} USD
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {userPayments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>

                <td>
                  {payment.amount}{" "}
                  {payment.currency?.toUpperCase()}
                </td>

                <td>
                  <span className="badge badge-primary">
                    Membership
                  </span>
                </td>

                <td>{payment.clubName}</td>

                <td>
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>

                <td>
                  <span className="badge badge-success">
                    {payment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {userPayments.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No payment history found.
          </p>
        )}
      </div>
    </div>
            
        
    );
};

export default UserPaymentHistory;