import { useEffect, useState } from "react"
import { useExcelReading } from "./useExcelReading"

export const useExcelSheets = (file?: File, suspense?: boolean) => {
    const {data, isSuccess, isLoading} = useExcelReading(file, suspense)

    const [sheets, setSheets] = useState<Array<string>>()

    useEffect(() => {
        if(!file){
            setSheets(undefined)
        }

        if(isSuccess){
            setSheets(data.SheetNames)
        }
    }, [isSuccess, file])
    
    return {sheets, isLoading}
}