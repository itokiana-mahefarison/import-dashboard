import { Router } from "express";
import { EntryStock, PrixProduit, Produit, Site } from "../entities";
import _ from "lodash"
import { Between } from "typeorm";
import moment from "moment";

export const RecapStocksController = Router()

RecapStocksController.get('/recap', async (req, res, next) => {
    try {
        const allSites = await Site.find()
        const allProduct = await Produit.find()

        const params = req.query as RecapQuery

        const recap = await Promise.all(allProduct.map( async (product) => {
            const recapRow: any = {
                id: product?.id,
                label: product?.label,
                class: product?.class,
                totalAmount: []
            }

            await Promise.all(allSites.map(async (site) => {
                const entryStockBySite = await EntryStock.find({
                    where: {
                        site: {
                            id: site.id
                        },
                        produit: {
                            id: product.id
                        },
                        entryDate: Between(
                            moment(params?.period).toISOString(true),
                            moment(params?.period).add(1, "month").toISOString(true)
                        )
                    }
                })

                const poidsNetArray = entryStockBySite?.map((stock) => stock?.poidsNetKg)
                const total = !_.isEmpty(poidsNetArray) ? poidsNetArray?.filter((poid) => poid !== undefined )?.reduce((prev, next) => prev + next, 0) : 0

                if(site?.name){
                    recapRow[site?.name] = total
                }
                
                const stockPriceArray = entryStockBySite?.map((stock) => (stock?.poidsNetKg || 0) * (stock?.prix?.prix || 0))
                const totalAmount = !_.isEmpty(stockPriceArray) ? stockPriceArray?.reduce((prev, next) => prev + next, 0) : 0

                if(site?.name){
                    recapRow["totalAmount"] = [
                        ...recapRow["totalAmount"],
                        totalAmount
                    ]
                }
            }))

            return {
                ...recapRow,
                totalAmount: (recapRow.totalAmount as Array<number>).reduce((a, b) => a + b , 0)
            }
        }))

        return res.status(200).json(recap)

    } catch (error) {
        next(error)
    }
})

type RecapQuery = {
    period?: string
}