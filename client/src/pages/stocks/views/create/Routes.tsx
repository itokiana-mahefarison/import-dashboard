import React from "react";
import { RouteObject } from "react-router-dom";

const CreateStocksContainer = React.lazy(() => import('./containers/CreateStocksContainer'))

const routes: Array<RouteObject> = [
    {
        path: "create",
        element: <CreateStocksContainer/>
    }
]

export default routes