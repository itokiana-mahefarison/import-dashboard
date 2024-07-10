import { useEffect, useState } from "react"
import { useExcelReading } from "./useExcelReading"
import { utils } from 'xlsx'
import { ExcelColumnsReadingProps } from "./useExcelColumns"
import _ from 'lodash'

export const useExcelRows = ({file, suspense, dataRange, sheetName}: Props) => {
    const {data, isSuccess} = useExcelReading(file, suspense)
    const [rows, setRows] = useState<Array<any>>()

    useEffect(() => {
        if(isSuccess){
            const dataRows = utils.sheet_to_json(data.Sheets[sheetName], {defval: "", range: dataRange})

            setRows(dataRows)
            

        }
    }, [isSuccess])

    return rows
}

type Props = ExcelColumnsReadingProps & {
    showErrorOnly?: boolean,
    dataRange?: string,
    sheetName: string
}