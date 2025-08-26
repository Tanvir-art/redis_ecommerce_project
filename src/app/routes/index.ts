import express from 'express'; 
import { userRouter } from '../modules/user/user.route'; 
import { productRouter } from '../modules/product/product.route';
import { cartRouter } from '../modules/cart/cart.route';
import { orderRouter } from '../modules/order/order.route';

const router = express.Router();

const moduleRouter = [
    {
        path: '/users',
        route: userRouter
    },
    {
        path: '/products',
        // route: (await import('../modules/product/product.route.js')).productRouter
        route : productRouter
    }, 
    {
        path: "/carts",
        route: cartRouter
    },
    {
        path: '/orders',
        route: orderRouter
    }
]

moduleRouter.forEach((route)=> router.use(route.path, route.route) )
export default router;