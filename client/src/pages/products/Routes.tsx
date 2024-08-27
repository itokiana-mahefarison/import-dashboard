import { Outlet, RouteObject } from "react-router-dom";
import ProductListRoutes from "./views/list/Routes"
import ProductDetailsRoutes from "./views/details/Routes"

const routes: Array<RouteObject> = [
    {
        path: 'products',
        element: <Outlet/>,
        children: [
            ...ProductListRoutes,
            ...ProductDetailsRoutes
        ]
    }
]

export default routes