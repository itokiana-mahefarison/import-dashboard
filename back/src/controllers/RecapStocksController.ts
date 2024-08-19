import { Router } from "express";
import { PrixProduit, Produit, Site } from "../entities";
import _ from "lodash"

export const RecapStocksController = Router()

RecapStocksController.get('/recap', async (req, res, next) => {
    try {
        const allSites = await Site.find()
        const allProduct = await Produit.find()

        const recap = await Promise.all(allProduct.map( async (product) => {
            const recapRow: any = {
                id: product?.id,
                label: product?.label,
                class: product?.class
            }

            await Promise.all(allSites.map(async (site) => {
                const entryStockBySite = (await product.entryStock)?.filter((stock) => stock?.site?.id === site.id)
                const poidsNetArray = entryStockBySite?.map((stock) => stock?.poidsNetKg)
                const total = !_.isEmpty(poidsNetArray) ? poidsNetArray?.filter((poid) => poid !== undefined )?.reduce((prev, next) => prev + next, 0) : 0

                if(site?.name){
                    recapRow[site?.name] = total
                }
            }))

            const lastPrix = await PrixProduit.find({
                where: {
                    produit: {
                        id: product.id
                    }
                },
                order: {
                    createdAt: "DESC"
                },
                take: 1
            })

            if(lastPrix?.length === 0){
                recapRow["prix"] = 0
            }else{
                recapRow["prix"] = lastPrix[0].prix
            }

            return recapRow
        }))

        return res.status(200).json(recap)

    } catch (error) {
        next(error)
    }
})