
import { Router } from "express"
import { PrixProduit } from "../entities"
import _ from "lodash"
import { FindAllBody } from "./CRUDType"
import { convertFilter } from "../utils/FilterUtils"

const router = Router()

router.get('/getAll', async (req, res, next) => {
    const dataFilter = req.query as FindAllBody

    const prixproduits = await PrixProduit.find({
        where: convertFilter(dataFilter?.filter),
        select: dataFilter?.select,
        take: dataFilter?.pageSize,
        order: {
            createdAt: "DESC",
            id: "DESC"
        }
    })

    return res.status(200).json({
        total: prixproduits.length,
        data: prixproduits
    })
})

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const prixproduit = await PrixProduit.findOne({
        where: {
            id: parseInt(id)
        }
    })

    if(!prixproduit){
        return res.status(404).json({message: "PRIXPRODUIT_NOT_FOUND"})
    }

    return res.status(200).json(prixproduit)
})

router.post('/insert', async (req, res, next) => {
    const data = req.body

    const entity = await PrixProduit.create(data as PrixProduit).save()
    return res.status(200).json({id: entity.id})
})

router.post('/insertBatch', async (req, res, next) => {
    const data = req.body

    const entities = await Promise.all(data.map((item: PrixProduit) => PrixProduit.save(item as PrixProduit)))
    return res.status(200).json({rows: entities.length})
})

router.put('/update', async (req, res, next) => {
    const data = req.body

    const entity = await PrixProduit.update({
        id: data?.id
    }, _.omit(data, ['id']))

    return res.status(200).json({rowsUpdated: entity.affected})

})

router.delete('/delete', async (req, res, next) => {
    const data = req.body

    const entity = await PrixProduit.delete({
        id: data?.id
    })

    return res.status(200).json({rowsDeleted: entity.affected})
})

export default router
