import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateClubs from "../pages/createClubs/CreateClubs";
import DashboardLayout from "../layouts/DashboardLayout";
import AllAdminClubs from "../pages/Dashboard/AllAdminClubs";
import ClubDetails from "../pages/Home/ClubDetails";
import Payment from "../pages/Dashboard/Payment";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import CreateEvents from "../pages/Events/CreateEvents";
import SelfClubs from "../pages/Dashboard/OnlClubMembers/SelfClubs";




export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout></RootLayout>,

        children:[
            {
                index:true,
                element: <Home></Home>
            },
            {
                path: 'allClubs/:id',
                element: <ClubDetails></ClubDetails>
            }
        ]

    },
    {
        path: 'register',
        element: <Register></Register>
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'createClubs',
        element: <CreateClubs></CreateClubs>
    },

    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: 'allAdminClubs',
                element: <AllAdminClubs></AllAdminClubs>
            },
            {
                path: 'payment/:membershipId',
                element: <Payment></Payment>
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess></PaymentSuccess>
            },

            {
                path: 'payment-canceled',
                element: <PaymentCancelled></PaymentCancelled>
            },
            //club mambers
            {
                path: 'createEvents',
                element: <CreateEvents></CreateEvents>
            },
            {
                path: 'selfClubs',
                element: <SelfClubs></SelfClubs>
            }

        ]
    }
])