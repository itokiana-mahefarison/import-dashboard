import React from "react";
import { RouteObject } from "react-router-dom";

const StocksListContainer = React.lazy(() => import('./container/StocksListContainer'))

const routes: Array<RouteObject> = [
    {
        path: "",
        element: <StocksListContainer/>
    }
]

export default routes