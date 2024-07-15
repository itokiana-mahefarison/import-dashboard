import React from "react";
import { RouteObject } from "react-router-dom";
import ViewRoutes from "./views/Routes"

const StocksListContainer = React.lazy(() => import('./containers/StocksListContainer'))
const ImportStocksContainer = React.lazy(() => import('./containers/ImportStocksContainer'))

const routes: Array<RouteObject> = [
    {
        path: '/stocks',
        element: <StocksListContainer />,
        children: ViewRoutes
    },
    {
        path: '/stocks/import',
        element: <ImportStocksContainer />
    }
]

export default routes