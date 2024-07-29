
import { Router } from "express"
import { EntryStock } from "../entities"
import _ from "lodash"
import { FindAllBody } from "./CRUDType"
import { convertFilter } from "../utils/FilterUtils"

const router = Router()

router.get('/getAll', async (req, res, next) => {
    const dataFilter = req.query as FindAllBody

    const entrystocks = await EntryStock.find({
        where: convertFilter(dataFilter?.filter),
        select: dataFilter?.select,
        take: dataFilter?.pageSize,
    })

    return res.status(200).json({
        total: entrystocks.length,
        data: entrystocks
    })
})

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const entrystock = await EntryStock.findOne({
        where: {
            id
        }
    })

    if(!entrystock){
        return res.status(404).json({message: "ENTRYSTOCK_NOT_FOUND"})
    }

    return res.status(200).json(entrystock)
})

router.post('/insert', async (req, res, next) => {
    const data = req.body

    const entity = await EntryStock.create(data as EntryStock).save()
    return res.status(200).json({id: entity.id})
})

router.post('/insertBatch', async (req, res, next) => {
    const data = req.body

    const entities = await Promise.all(data.map((item: EntryStock) => EntryStock.save(item as EntryStock)))
    return res.status(200).json({rows: entities.length})
})

router.put('/update', async (req, res, next) => {
    const data = req.body

    const entity = await EntryStock.update({
        id: data?.id
    }, _.omit(data, ['id']))

    return res.status(200).json({rowsUpdated: entity.affected})

})

router.delete('/delete', async (req, res, next) => {
    const data = req.body

    const entity = await EntryStock.delete({
        id: data?.id
    })

    return res.status(200).json({rowsDeleted: entity.affected})
})

export default router
