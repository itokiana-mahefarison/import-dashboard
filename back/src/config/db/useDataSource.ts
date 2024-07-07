import { DataSource, DataSourceOptions } from "typeorm"
import { Entities } from '../../entities'

export const useDataSource = async (props: DataSourceProps) => {
    const dataSource = new DataSource({
        type: process.env.DB_TYPE as any || 'mysql',
        ...props.options,
        entities: [...Entities]
    })

    await dataSource.initialize()
    if(props.runMigrations){
        await dataSource.synchronize()
        console.log('[DataSource] synchronised')

        await dataSource.runMigrations()
        console.log('[DataSource] migrations')
    }

    useSetDataSource(dataSource)
    return dataSource

}

type DataSourceProps = {
    options: Partial<DataSourceOptions>
    runMigrations?: boolean
}

export const useGetDataSource = (): DataSource | undefined => {
    return (global as any).dataSource
}

export const useSetDataSource = (dataSource?: DataSource) => {
    (global as any).dataSource = dataSource
}