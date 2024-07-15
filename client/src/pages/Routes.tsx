import { RouteObject } from "react-router-dom";
import HomeRoutes from "./home/HomeRoutes"
import StocksRoutes from "./stocks/Routes"
import ProductRoutes from "./products/Routes"
import { MainLayout } from "./components/MainLayout";

const routes: Array<RouteObject> = [
    {
        path: "",
        element: <MainLayout/>,
        children: [
            ...HomeRoutes,
            ...StocksRoutes,
            ...ProductRoutes
        ]
    }
]

export default routes