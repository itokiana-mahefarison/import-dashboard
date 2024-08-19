import { ILike, MoreThanOrEqual, LessThanOrEqual } from "typeorm"

export const convertFilter = (filter?: Record<string, any>) => {
    if(!filter){
        return undefined
    }

    const whereOptions: Record<string, any> = {}
    Object.keys(filter).forEach((key) => {
        const columnLike = checkIfLike(key)
        const columnSup = checkIfSup(key)
        const columnInf = checkIfInf(key)
        if(columnLike){
            whereOptions[columnLike] = ILike(`%${filter[key]}%`)
            return;
        }

        if(columnInf){
            whereOptions[columnInf] = LessThanOrEqual(filter[key])
            return;
        }

        if(columnSup){
            whereOptions[columnSup] = MoreThanOrEqual(filter[key])
            return;
        }

        whereOptions[key] = filter[key]
    })
    
    return whereOptions
}

const checkIfLike = (key: string) => {
    const regex = /^(.+)_like$/;
    const column = key.match(regex)

    return column ? column[1] : undefined
}

const checkIfSup = (key: string) => {
    const regex = /^(.+)_sup$/;
    const column = key.match(regex)

    return column ? column[1] : undefined
}

const checkIfInf = (key: string) => {
    const regex = /^(.+)_inf$/;
    const column = key.match(regex)

    return column ? column[1] : undefined
}