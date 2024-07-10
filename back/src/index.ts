import "reflect-metadata"
import dotenv from "dotenv"
import { initApp, useExpressApp } from "./config"


// Import all crud controller
import EntryStockRouter from './crud/EntryStockController'
import ProduitRouter from './crud/ProduitController'
import SiteRouter from './crud/SiteController'
import { ImportController } from "./controllers/ImportController"



try{
    let config = dotenv.config();
    if(process.env.NODE_ENV){
        config = {
            ...config,
            ...dotenv.config({path: `./.env.${process.env.NODE_ENV}`})
        }
    }
    if(config.error) throw config.error
    console.log(config.parsed)
}catch(e) {
    console.log(e)
}

const app = useExpressApp({
    routes: [],
})

app.use(ImportController)

// add crud controller middleware
app.use('/entrystock', EntryStockRouter)
app.use('/produit', ProduitRouter)
app.use('/site', SiteRouter)


initApp(app)
