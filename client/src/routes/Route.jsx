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
                element: <AddJob></AddJob>
            },
            {
                path: '/job/:id',
                element: <JobDetails></JobDetails>
            },
            {
                path: '/my-posted-jobs',
                element: <MyPostedJobs></MyPostedJobs>
            },
            {
                path: '/jobUpdate/:id',
                element: <UpdateJob></UpdateJob>,
                loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/jobById/${params.id}`)
            }
        ]
    }
])
export default router;