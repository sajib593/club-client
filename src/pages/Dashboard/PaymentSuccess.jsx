import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const PaymentSuccess = () => {

    let [searchParams] = useSearchParams('session_id');
    let [paymentInfo, setPaymentInfo] = useState({});
    let sessionId = searchParams.get('session_id');
    console.log(sessionId);

    let axiosSecure = useAxiosSecure();

    useEffect(()=>{

        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    // trackingId: res.data.trackingId,
                })

            })
        }

    }, [sessionId, axiosSecure])

    return (
        <div>
            <h2>payment successful</h2>
            <p>transaction Id : {paymentInfo.transactionId}</p>
            {/* <p>Tracking  Id : {paymentInfo.trackingId}</p> */}
        </div>
    );
};

export default PaymentSuccess;