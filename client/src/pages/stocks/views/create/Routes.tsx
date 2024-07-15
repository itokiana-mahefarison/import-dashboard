import React from "react";
import { RouteObject } from "react-router-dom";

const StockCreateContainer = React.lazy(() => import('./containers/StockCreateContainer'))
const SiteCreateContainer = React.lazy(() => import('./containers/SiteCreateContainer'))
const ProductCreateContainer = React.lazy(() => import('./containers/ProductCreateContainer'))

const routes: Array<RouteObject> = [
    {
        path: 'create',
        element: <StockCreateContainer/>
    },
    {
        path: 'product',
        element: <ProductCreateContainer/>
    },
    {
        path: 'site',
        element: <SiteCreateContainer/>
    }
] 

export default routes