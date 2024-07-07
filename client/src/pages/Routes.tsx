import { RouteObject } from "react-router-dom";
import HomeRoutes from "./home/HomeRoutes"
import StocksRoutes from "./stocks/Routes"
import { MainLayout } from "./components/MainLayout";

const routes: Array<RouteObject> = [
    {
        path: "",
        element: <MainLayout/>,
        children: [
            ...HomeRoutes,
            ...StocksRoutes
        ]
    }
]

export default routes