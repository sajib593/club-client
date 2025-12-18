import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ClubDetails = () => {

    let axiosInstance = useAxios();
    let {user} = useAuth();
    let {id} = useParams();
let navigate = useNavigate();

    // console.log(user);

    // this is get data for params
     const { data: singleclub, isLoading, isError } = useQuery({
        queryKey: ['singleclub', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/allClubs/${id}`);
            return res.data;
        }
    });

    // console.log(singleclub);

// get data for the status
    const { data: membership, refetch: refetchMembership, isLoading: loadingMembership } = useQuery({
    queryKey: ["membership", user?.email, id],
    enabled: !!user?.email,
    queryFn: async () => {
        const res = await axiosInstance.get(`/memberShip/user/${user.email}/club/${id}`);
        return res.data;
    }
});


    let handleCreateMembership  = async(singleclub)=>{


         if (membership?.status === "active") return;
    if (membership?.status === "pending_payment") {
        return navigate(`/dashboard/payment/${membership._id}`); 
    }

        
        let memberShipData = {

            userEmail : user?.email,
            userName : user?.displayName,
            clubId : singleclub._id,
            membershipFee : singleclub?.membershipFee,
            clubName: singleclub?.clubName,
            joinedAt: new Date(),
            expireAt: new Date(new Date().setFullYear(new Date().getFullYear() +1))


        }


      try {
        const res = await axiosInstance.post("/memberShip", memberShipData);

        await refetchMembership()

        if (res.data.status === "active") {
            Swal.fire("Success", "Membership Activated!", "success");
        } else if (res.data.status === "pending_payment") {
            Swal.fire("Pending", "Please complete your payment", "info");
            navigate(`/dashboard/payment/${res.data.insertedId}`);
        }

    } catch (error) {
        // console.log(error);
        Swal.fire("Error", "Something went wrong", "error");
    }
        

    }


    if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Failed to load jobs.</p>;

  if(loadingMembership) return <p>Loading.......</p>


    return (
        
        <>

         <div className="p-5">
            <h2 className="text-3xl font-bold">Club Details</h2>
            
        </div>

        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src={singleclub?.bannerImage}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">{singleclub?.clubName}</h1>

      
            <p className='font-bold'>Category: {singleclub?.category}</p>
            <p className='font-bold'>Email: {singleclub?.managerEmail}</p>
            <p className='font-bold'>Fee: {singleclub?.membershipFee} $</p>
            <p className='font-bold'>Since: {singleclub?.createdAt}</p>

      <p className="py-6">
        {singleclub?.description}
      </p>

      
      <button
  onClick={() => handleCreateMembership(singleclub)}
  className="btn btn-primary"
>
  {membership?.status === "active"
    ? "Active Member"
    : membership?.status === "pending_payment"
    ? "Pending Payment"
    : "Join Now"}
</button>
    </div>
  </div>
</div>
        </>
    );
};

export default ClubDetails;



