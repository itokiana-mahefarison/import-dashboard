import React from "react";
import { RouteObject } from "react-router-dom";

const ImportStocksContainer = React.lazy(() => import('./containers/ImportStocksContainer'))

const routes: Array<RouteObject> = [
    {
        path: "import",
        element: <ImportStocksContainer/>
    }
]

export default routes