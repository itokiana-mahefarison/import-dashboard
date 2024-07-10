import express, { Express, Router, urlencoded, json } from "express"
import { useDataSource } from "../db/useDataSource"
import { errorHandler } from "../middlewares"
import { corsMiddleware } from "../middlewares/CorsMiddleware"

export const useExpressApp = (props: ExpressAppProps) => {
    const app = express()

    app.use(corsMiddleware)
    app.use(urlencoded({extended: false}))
    app.use(json())

    props.routes?.forEach((item) => app.use(item))
    app.use(errorHandler)

    return app
}

export const initApp = async (app: Express) => {
    await useDataSource({
        options: {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: +(process.env.DB_PORT || '3306')
        },
        runMigrations: true
    })

    const port = process.env.PORT || 3000

    app.listen(port, () => {
        console.log(`[Server] running at port ${port}`)
    })
}

type ExpressAppProps = {
    routes?: Array<Router>
}