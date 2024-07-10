import { useEffect, useState } from "react"
import { useExcelReading } from "./useExcelReading"
import { utils } from 'xlsx'

export const useExcelColumns = ({file, suspense}: ExcelColumnsReadingProps) => {
    const {data, isSuccess} = useExcelReading(file, suspense)

    const [columns, setColumns] = useState<Array<any>>()

    useEffect(() => {
        if(isSuccess){
            const firstSheet = data.SheetNames[0]
            const headers = (utils.sheet_to_json(data.Sheets[firstSheet], {header: 1}) as Array<any>)[0]

            setColumns(headers)
        }
    }, [isSuccess])
    
    return columns
}

export type ExcelColumnsReadingProps = {
    file?: File,
    filterColumns?: Array<string>,
    suspense?: boolean
}