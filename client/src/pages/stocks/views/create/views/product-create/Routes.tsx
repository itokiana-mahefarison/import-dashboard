import React from "react";
import { RouteObject } from "react-router-dom";

const ProductCreateContainer = React.lazy(() => import("./containers/ProductCreateContainer"))

const routes: Array<RouteObject> = [
    {
        path: "product-create",
        element: <ProductCreateContainer/>
    }
]

export default routes