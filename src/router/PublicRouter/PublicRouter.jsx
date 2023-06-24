
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/LoginRegister/Login/Login';
import ProductsDetails from '../../pages/ProductsDetails/ProductsDetails';

import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import AdminOrders from '../../pages/AdminOrders/AdminOrders';
import MyOrders from '../../pages/MyOrders/MyOrders';

const router =createBrowserRouter([
    
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },

            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/admin/orders',
                element:<AdminOrders></AdminOrders>
            },
            {
                path:'/myOrders',
                element:<MyOrders></MyOrders>
            },
            
            {
                path:'/productsDetails/:id',
                element:<ProductsDetails></ProductsDetails>,
                loader:({params})=>fetch(`https://heroverse-toys-server-site.vercel.app/productsDetails/${params.id}`)
            },
            
           
        ]
    }
])

export default router;