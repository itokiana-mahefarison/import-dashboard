import { Router } from "express";
import { EntryStock, Produit, Site } from "../entities";

export const ImportController = Router()

ImportController.post("/import", async (req, res, next) => {
    try {
        const data = req.body as Array<EntryStock>

        const dataToImport = await Promise.all((data.map(async (item): Promise<Partial<EntryStock>> => {
            const product = await Produit.findOne({
                where: {
                    id: item.produit?.id
                }
            })

            if(!product && item.produit){
                await Produit.save(item.produit)
            }

            const site = await Site.findOne({
                where: {
                    id: item.site?.id
                }
            })

            if(!site && item.site){
                await Site.save(item.site)
            }

            return item
        })))

        const result = await EntryStock.insert(dataToImport)

        return res.status(200).json({rows: result.identifiers?.length})
    } catch (error) {
        return next(error)
    }
})