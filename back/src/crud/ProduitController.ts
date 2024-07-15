
import { Router } from "express"
import { Produit } from "../entities"
import _ from "lodash"
import { FindAllBody } from "./CRUDType"

const router = Router()

router.get('/getAll', async (req, res, next) => {
    const dataFilter = req.body as FindAllBody

    const produits = await Produit.find({
        where: dataFilter?.filter,
        select: dataFilter?.select,
        take: dataFilter?.pageSize,
    })

    return res.status(200).json({
        total: produits.length,
        data: produits
    })
})

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const produit = await Produit.findOne({
        where: {
            id
        }
    })

    if(!produit){
        return res.status(404).json({message: "PRODUIT_NOT_FOUND"})
    }

    return res.status(200).json(produit)
})

router.post('/insert', async (req, res, next) => {
    const data = req.body

    const entity = await Produit.create(data as Produit).save()
    return res.status(200).json({id: entity.id})
})

router.post('/insertBatch', async (req, res, next) => {
    const data = req.body

    const entities = await Promise.all(data.map((item: Produit) => Produit.save(item as Produit)))
    return res.status(200).json({rows: entities.length})
})

router.put('/update', async (req, res, next) => {
    const data = req.body

    const entity = await Produit.update({
        id: data?.id
    }, _.omit(data, ['id']))

    return res.status(200).json({rowsUpdated: entity.affected})

})

router.delete('/delete', async (req, res, next) => {
    const data = req.body

    const entity = await Produit.delete({
        id: data?.id
    })

    return res.status(200).json({rowsDeleted: entity.affected})
})

export default router
