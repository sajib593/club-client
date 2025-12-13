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
import ShowAllEvents from "../pages/Events/ShowAllEvents";
import SingleEventDetails from "../pages/Events/SingleEventDetails";
import ErrorPage from "../pages/ErrorPage";
import ClubCards from "../pages/Home/ClubCards";
import SelfClubMembers from "../pages/Dashboard/OnlClubMembers/SelfClubMembers";
import SelfEventList from "../pages/Dashboard/SelfEventList";
import UpdateClubs from "../pages/Dashboard/UpdateClubs";




export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout></RootLayout>,
        errorElement: <ErrorPage></ErrorPage>,

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
        path: 'clubCards',
        element: <ClubCards navbar={'navbar'}></ClubCards>
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
                path: 'createEvents/:id',
                element: <CreateEvents></CreateEvents>
            },
            {
                path: 'selfClubs',
                element: <SelfClubs></SelfClubs>
            },
            {
                path: 'showAllEvents',
                element: <ShowAllEvents></ShowAllEvents>
            },
            {
                path: 'singleEventDetails/:id',
                element: <SingleEventDetails></SingleEventDetails>
            },
            //manager

            {
                path: 'selfClubMembers',
                element: <SelfClubMembers></SelfClubMembers>
            },
            // manager
            {
                path: 'selfEventList',
                element: <SelfEventList></SelfEventList>
            },
            {
                path: 'updateClubs/:id',
                element: <UpdateClubs></UpdateClubs>
            }

        ]
    }
])