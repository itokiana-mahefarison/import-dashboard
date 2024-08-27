import React from "react";
import { RouteObject } from "react-router-dom";

const ProductDetailsStats = React.lazy(() => import('./containers/ProductDetailsStats'))

const routes: Array<RouteObject> = [
    {
        path: 'stats',
        element: <ProductDetailsStats/>
    }
]

export default routes