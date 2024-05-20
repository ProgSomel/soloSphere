import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from './../pages/Registration';
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import ErrorPage from './../pages/ErrorPage';
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import MyBids from "../pages/MyBids";
import BidRequests from './../pages/BidRequests';
import AllJobs from "../pages/AllJobs";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/add-job',
                element:<PrivateRoute>
                     <AddJob></AddJob>
                </PrivateRoute>
            },
            {
                path: '/job/:id',
                element: <JobDetails></JobDetails>
            },
            {
                path: '/my-posted-jobs',
                element: <PrivateRoute>
                    <MyPostedJobs></MyPostedJobs>
                </PrivateRoute>
            },
            {
                path: '/jobUpdate/:id',
                element: <PrivateRoute>
                    <UpdateJob></UpdateJob>
                </PrivateRoute>,
                loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/jobById/${params.id}`)
            },


            {
                path: '/my-bids',
                element: <PrivateRoute>
                    <MyBids></MyBids>
                </PrivateRoute>
            },
            {
                path: '/bid-requests',
                element: <PrivateRoute>
                    <BidRequests></BidRequests>
                </PrivateRoute>
            },
            {
                path: '/jobs',
                element: <AllJobs></AllJobs>
            }
        ]
    }
])
export default router;