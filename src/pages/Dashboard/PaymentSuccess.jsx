import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const PaymentSuccess = () => {

    let [searchParams] = useSearchParams('session_id');
    let sessionId = searchParams.get('session_id');
    let axiosSecure = useAxiosSecure();
    const calledRef = useRef(false);

    let [paymentInfo, setPaymentInfo] = useState({});
    // console.log(sessionId);


     useEffect(() => {
    if (!sessionId || calledRef.current) return;

    calledRef.current = true; //  block second call

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        setPaymentInfo({
          transactionId: res.data.transactionId,
        });
      });

  }, [sessionId, axiosSecure]);


    // useEffect(()=>{

    //     if(sessionId){
    //         axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
    //         .then(res=>{
    //             console.log(res.data);
    //             setPaymentInfo({
    //                 transactionId: res.data.transactionId,
    //                 // trackingId: res.data.trackingId,
    //             })

    //         })
    //     }

    // }, [sessionId, axiosSecure])

    return (
        <div>
            <h2>payment successful</h2>
            <p>transaction Id : {paymentInfo.transactionId}</p>
            {/* <p>Tracking  Id : {paymentInfo.trackingId}</p> */}
        </div>
    );
};

export default PaymentSuccess;