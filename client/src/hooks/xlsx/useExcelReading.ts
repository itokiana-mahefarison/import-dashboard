import { useQuery } from 'react-query'
import { read } from 'xlsx'

export const useExcelReading = (file?: File, suspense?: boolean) => {
    const getWorkBook = (file?: File) => {
        if(!file){
            return Promise.reject('no File')
        }

        return Promise.resolve(file.arrayBuffer().then(data => read(data, { type: 'binary', cellDates: true})))
    }

    return useQuery(
        ['fileExcelReader', file?.name, file?.lastModified, file?.size],
        () => getWorkBook(file),
        {
            enabled: Boolean(file),
            suspense
        }
    )
}