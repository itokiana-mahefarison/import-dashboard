import React from "react";
import { RouteObject } from "react-router-dom";

const StocksListContainer = React.lazy(() => import('./containers/StocksListContainer'))
const ImportStocksContainer = React.lazy(() => import('./containers/ImportStocksContainer'))
const CreateStocksContainer = React.lazy(() => import('./containers/CreateStocksContainer'))

const routes: Array<RouteObject> = [
    {
        path: '/stocks',
        element: <StocksListContainer />,
    },
    {
        path: '/stocks/import',
        element: <ImportStocksContainer />
    },
    {
        path: '/stocks/create',
        element: <CreateStocksContainer/>
    }
]

export default routes