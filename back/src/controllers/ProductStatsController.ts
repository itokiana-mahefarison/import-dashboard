import { Router } from "express";
import { EntryStock, PrixProduit } from "../entities";
import moment from "moment";
import _ from "lodash"
import { Between } from "typeorm";

export const ProductStatsController = Router()

ProductStatsController.get("/stats/:id", async (req, res, next) => {
    try {
        const {id} = req.params
        const query = req.query as any

        const allEntries = await EntryStock.find({
            where: {
                produit: {
                    id
                },
                entryDate: Between(query.from, query.to)
            }
        })
        const result = {} as StatsProduct

        result.totalStock = allEntries
                                    ?.map((entry) => entry.poidsNetKg)
                                    .filter((poids) => poids !== undefined)
                                    .reduce((prev, next) => prev + next, 0) || 0

        result.totalAmount = allEntries
                                    ?.map((entry) => (entry.poidsNetKg || 0) * (entry?.prix?.prix || 0))
                                    .reduce((prev, next) => prev + next, 0) || 0

        const pricesUsed = allEntries
                                    ?.map((entry) => entry.prix)
                                    .filter((prix) => prix !== undefined && prix !== null)
                                    .sort((a, b) => moment(a.createdAt).diff(b.createdAt, 'month')) || []

        const allPrices = [] as Array<Partial<PrixProduit>>
        pricesUsed.forEach((item, index) => {
            allPrices.push({
                prix: item.prix,
                createdAt: moment(item.createdAt).toISOString(true)
            })
            if(index + 1 >= pricesUsed.length){
                return
            }

            const after = pricesUsed[index+1]
            const monthsDifference = moment(after?.createdAt).diff(item?.createdAt, "month", true)
            if(monthsDifference > 0){
                _.times(_.toInteger(monthsDifference)).forEach((month) => {
                    const nextMonth = moment(item.createdAt).add(month+1, 'month')
                    const afterMonth = moment(after.createdAt)

                    if(nextMonth.month() === afterMonth.month() && nextMonth.year() === afterMonth.year()){
                        return
                    }

                    allPrices.push({
                        prix: item.prix,
                        createdAt: nextMonth.toISOString(true)
                    })
                })
            }
        })

        result.allPrices = allPrices

        const stockGroupBySite = _.groupBy(allEntries, (entry) => entry.site?.name)
        const allStocksBySite = [] as Array<StockBySite>

        Object.keys(stockGroupBySite).forEach((key) => {
            allStocksBySite.push({
                site: key.toUpperCase(),
                stock: stockGroupBySite[key]
                                        ?.map((entry) => entry.poidsNetKg)
                                        .filter((poids) => poids !== undefined)
                                        .reduce((prev, next) => prev + next, 0)
            })
        })

        result.stockBySite = allStocksBySite

        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

type StatsProduct = {
    totalStock: number
    totalAmount: number
    allPrices: Array<Partial<PrixProduit>>
    stockBySite: Array<StockBySite>
}

type StockBySite = {
    stock: number,
    site: string
}