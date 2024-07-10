
import { Router } from "express"
import { Site } from "../entities"
import _ from "lodash"
import { FindAllBody } from "./CRUDType"

const router = Router()

router.get('/getAll', async (req, res, next) => {
    const dataFilter = req.body as FindAllBody

    const sites = await Site.find({
        where: dataFilter?.filter,
        select: dataFilter?.select,
        take: dataFilter?.pageSize,
    })

    return res.status(200).json({
        total: sites.length,
        data: {
            sites
        }
    })
})

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const site = await Site.findOne({
        where: {
            id
        }
    })

    if(!site){
        return res.status(404).json({message: "SITE_NOT_FOUND"})
    }

    return res.status(200).json({ site })
})

router.post('/insert', async (req, res, next) => {
    const data = req.body

    const entity = await Site.create(data as Site).save()
    return res.status(200).json({id: entity.id})
})

router.post('/insertBatch', async (req, res, next) => {
    const data = req.body

    const entities = await Promise.all(data.map((item: Site) => Site.save(item as Site)))
    return res.status(200).json({rows: entities.length})
})

router.put('/update', async (req, res, next) => {
    const data = req.body

    const entity = await Site.update({
        id: data?.id
    }, _.omit(data, ['id']))

    return res.status(200).json({rowsUpdated: entity.affected})

})

router.delete('/delete', async (req, res, next) => {
    const data = req.body

    const entity = await Site.delete({
        id: data?.id
    })

    return res.status(200).json({rowsDeleted: entity.affected})
})

export default router
