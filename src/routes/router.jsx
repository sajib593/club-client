import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateClubs from "../pages/createClubs/CreateClubs";
import DashboardLayout from "../layouts/DashboardLayout";
import AllAdminClubs from "../pages/Dashboard/AllAdminClubs";
import ClubDetails from "../pages/Home/ClubDetails";




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
            }
        ]
    }
])