import React from "react";
import { RouteObject } from "react-router-dom";
import ProductCreateRoutes from "./views/product-create/Routes"
import SiteCreateRoutes from "./views/site-create/Routes"

const CreateStocksContainer = React.lazy(() => import('./containers/CreateStocksContainer'))

const routes: Array<RouteObject> = [
    {
        path: "create",
        element: <CreateStocksContainer/>,
        children: [
            ...ProductCreateRoutes,
            ...SiteCreateRoutes
        ]
    }
]

export default routes