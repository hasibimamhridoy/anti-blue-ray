
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/LoginRegister/Login/Login';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import AdminOrders from '../../pages/AdminOrders/AdminOrders';
import MyOrders from '../../pages/MyOrders/MyOrders';
import BuyNow from '../../pages/Home/Products/BuyNow';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

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
                path:'buyNow/:id',
                element:<PrivateRouter><BuyNow></BuyNow></PrivateRouter>,
                loader:({params})=>fetch(`https://anti-blue-ray-server.vercel.app/products/${params.id}`)
            },
            
           
        ]
    }
])

export default router;