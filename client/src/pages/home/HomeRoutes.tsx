import React from "react";
import { RouteObject } from "react-router-dom";

const HomeContainer = React.lazy(() => import('./containers/HomeContainer'))

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <HomeContainer/>
    },
    {
        path: "/dashboard",
        element: <HomeContainer/>
    }
]

export default routes