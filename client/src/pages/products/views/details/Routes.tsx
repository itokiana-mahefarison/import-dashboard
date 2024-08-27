import React from "react"
import { RouteObject } from "react-router-dom"
import ProductDetailsStatsRoutes from "./views/stats/Routes"

const ProductDetailsContainer = React.lazy(() =>  import('./containers/ProductDetails'))

const routes: Array<RouteObject> = [
    {
        path: ':id',
        element: <ProductDetailsContainer/>,
        children: [
            ...ProductDetailsStatsRoutes
        ]
    }
]

export default routes