import React from "react";
import { RouteObject } from "react-router-dom";

const ProductContainer = React.lazy(() => import('./containers/ProductsContainer'))

const routes: Array<RouteObject> = [
    {
        path: '',
        element: <ProductContainer/>
    }
]

export default routes