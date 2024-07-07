import { useGetDataSource } from "./useDataSource"

export const useRepository = (entityName: string) => {
    const dataSource = useGetDataSource()
    if(!dataSource){
        throw 'NO_DATASOURCE'
    }

    try{
        return dataSource.getRepository(entityName)
    }catch(e) {
        throw e
    }

}