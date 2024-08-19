import "reflect-metadata"
import dotenv from "dotenv"
import { initApp, useExpressApp } from "./config"


// Import all crud controller
import EntryStockRouter from './crud/EntryStockController'
import ProduitRouter from './crud/ProduitController'
import SiteRouter from './crud/SiteController'
import PrixProduitRouter from './crud/PrixProduitController'

import { ImportController } from "./controllers/ImportController"
import { RecapStocksController } from "./controllers/RecapStocksController"

try{
    let config;
    if(process.env.NODE_ENV){
        config = dotenv.config({path: `./.env.${process.env.NODE_ENV}`})
    }else{
        config = dotenv.config()
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
app.use(RecapStocksController)


// add crud controller middleware
app.use('/entrystock', EntryStockRouter)
app.use('/produit', ProduitRouter)
app.use('/site', SiteRouter)
app.use('/prixproduit', PrixProduitRouter)

initApp(app)
