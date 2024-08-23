import React from "react";
import { RouteObject } from "react-router-dom";

const SiteCreateContainer = React.lazy(() => import("./containers/SiteCreateContainer"))

const routes: Array<RouteObject> = [
    {
        path: "site-create",
        element: <SiteCreateContainer/>
    }
]

export default routes