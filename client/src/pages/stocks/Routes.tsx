import React from "react";
import { RouteObject } from "react-router-dom";

const StocksListContainer = React.lazy(() => import('./containers/StocksListContainer'))
const ImportStocksContainer = React.lazy(() => import('./containers/ImportStocksContainer'))

const routes: Array<RouteObject> = [
    {
        path: '/stocks',
        element: <StocksListContainer />
    },
    {
        path: '/stocks/new',
        element: <ImportStocksContainer />
    }
]

export default routes