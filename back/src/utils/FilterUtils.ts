import { ILike } from "typeorm"

export const convertFilter = (filter?: Record<string, any>) => {
    if(!filter){
        return undefined
    }

    const whereOptions: Record<string, any> = {}
    Object.keys(filter).forEach((key) => {
        const columnLike = checkIfLike(key)
        if(columnLike){
            whereOptions[columnLike] = ILike(`%${filter[key]}%`)
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