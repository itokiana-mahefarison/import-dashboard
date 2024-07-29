import { mkdirSync, writeFileSync, existsSync } from "fs"
import { join } from "path"
import _ from "lodash"
import Mustache from "mustache"

export const generateControllerByEntity = (pathToGenerate: string, entityName: string) => {
    if(!existsSync(pathToGenerate)){
        mkdirSync(pathToGenerate, {recursive: true})
    }
    
    try {
        const typePath = join(pathToGenerate, 'CRUDType.ts')
        writeFileSync(typePath, type)
        
        const entityController = join(pathToGenerate, `${entityName}Controller.ts`)
        const params = {
            entity: entityName,
            entityLower: entityName.toLowerCase(),
            entityUpper: entityName.toUpperCase(),
            entitiesLower: `${entityName}s`.toLowerCase()
        }
        writeFileSync(entityController, Mustache.render(template, params))
    } catch (error) {
        console.error(error)
    }

}

export const addCRUDControllers = (indexData: string, entitiesName: Array<string>, crudFolder: string) => {
    const importTag = '// Import all crud controller'
    const addControllerTag = "// add crud controller middleware"

    const importParams = {
        folder: crudFolder,
        tag: importTag,
        controllers: entitiesName.map((entity) => {
            return {
                entity
            }
        })
    }

    const addControllerParams = {
        tag: addControllerTag,
        controllers: entitiesName.map((entity) => {
            return {
                entity,
                entityLower: entity.toLowerCase()
            }
        })
    }

    return indexData
                .replace(importTag, Mustache.render(importControllerTemplate, importParams))
                .replace(addControllerTag, Mustache.render(addMiddlewareTemplate, addControllerParams))
    
}

const template = `
import { Router } from "express"
import { {{entity}} } from "../entities"
import _ from "lodash"
import { FindAllBody } from "./CRUDType"
import { convertFilter } from "../utils/FilterUtils"

const router = Router()

router.get('/getAll', async (req, res, next) => {
    const dataFilter = req.query as FindAllBody

    const {{entitiesLower}} = await {{entity}}.find({
        where: convertFilter(dataFilter?.filter),
        select: dataFilter?.select,
        take: dataFilter?.pageSize,
    })

    return res.status(200).json({
        total: {{entitiesLower}}.length,
        data: {{entitiesLower}}
    })
})

router.get('/getById/:id', async (req, res, next) => {
    const { id } = req.params
    const {{entityLower}} = await {{entity}}.findOne({
        where: {
            id
        }
    })

    if(!{{entityLower}}){
        return res.status(404).json({message: "{{entityUpper}}_NOT_FOUND"})
    }

    return res.status(200).json({{entityLower}})
})

router.post('/insert', async (req, res, next) => {
    const data = req.body

    const entity = await {{entity}}.create(data as {{entity}}).save()
    return res.status(200).json({id: entity.id})
})

router.post('/insertBatch', async (req, res, next) => {
    const data = req.body

    const entities = await Promise.all(data.map((item: {{entity}}) => {{entity}}.save(item as {{entity}})))
    return res.status(200).json({rows: entities.length})
})

router.put('/update', async (req, res, next) => {
    const data = req.body

    const entity = await {{entity}}.update({
        id: data?.id
    }, _.omit(data, ['id']))

    return res.status(200).json({rowsUpdated: entity.affected})

})

router.delete('/delete', async (req, res, next) => {
    const data = req.body

    const entity = await {{entity}}.delete({
        id: data?.id
    })

    return res.status(200).json({rowsDeleted: entity.affected})
})

export default router
`

const type = `
export type FindAllBody = {
    filter?: Record<string, any>
    select?: Record<string, boolean>
    pageSize?: number
}
`

const importControllerTemplate = `
{{{tag}}}
{{#controllers}}
import {{entity}}Router from './{{folder}}/{{entity}}Controller'
{{/controllers}}
`

const addMiddlewareTemplate = `
{{{tag}}}
{{#controllers}}
app.use('/{{entityLower}}', {{entity}}Router)
{{/controllers}}
`