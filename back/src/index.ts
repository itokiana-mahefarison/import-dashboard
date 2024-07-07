import "reflect-metadata"
import dotenv from "dotenv"
import { initApp, useExpressApp } from "./config"

// Import all crud controller


try{
    const config = dotenv.config({path: `./.env.${process.env.NODE_ENV}`})
    if(config.error) throw config.error
    console.log(config.parsed)
}catch(e) {
    console.log(e)
}

const app = useExpressApp({
    routes: [],
})

// add crud controller middleware


initApp(app)
