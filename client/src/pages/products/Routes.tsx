import React from "react";
import { RouteObject } from "react-router-dom";

const ProductContainer = React.lazy(() => import('./containers/ProductsContainer'))

const routes: Array<RouteObject> = [
    {
        path: '/products',
        element: <ProductContainer/>
    }
]

export default routes