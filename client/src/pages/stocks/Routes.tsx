import { Outlet, RouteObject } from "react-router-dom";
import StockListRoutes from "./views/list/Routes"
import ImportStocksRoutes from "./views/import/Routes"
import CreateStocksRoutes from "./views/create/Routes"

const routes: Array<RouteObject> = [
    {
        path: "stocks",
        element: <Outlet/>,
        children: [
            ...StockListRoutes,
            ...ImportStocksRoutes,
            ...CreateStocksRoutes
        ]
    }
]

export default routes