import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxios from '../../hooks/useAxios';


const Payment = () => {
    let { membershipId } = useParams();
    let axiosInstance = useAxios();

    const { data: membership, isLoading } = useQuery({
        queryKey: ["membership", membershipId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payment/${membershipId}`);
            return res.data;
        }
    });
    // console.log(membership);

    const handleStripePayment = async () => {
        const res = await axiosInstance.post("/payment-checkout-session", {
            membershipId: membership._id,
            membershipFee: membership.membershipFee,
            userEmail: membership.userEmail,
            clubId: membership.clubId,
            clubName : membership.clubName
        });

        window.location.href = res.data.url;  // redirect to Stripe checkout
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='p-10 text-center'>
            <h1 className='text-3xl font-bold'>Payment Page</h1>
            <p className='mt-4 text-xl'>
                Membership Fee: ${membership.membershipFee}
            </p>

            <button
                className='btn btn-primary mt-6'
                onClick={handleStripePayment}
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
