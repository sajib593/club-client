import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateClubs from "../pages/createClubs/CreateClubs";




export const router = createBrowserRouter([
    {
        path:'/',
        element: <RootLayout></RootLayout>,

        children:[
            {
                index:true,
                element: <Home></Home>
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
    }
])