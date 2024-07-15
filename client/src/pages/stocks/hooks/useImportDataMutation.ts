import { useMutation } from "react-query"
import { read, utils } from "xlsx"
import { useImportConfigurationFormData } from "./useImportConfigurationFormData"
import { useFormatImportData } from "./useFormatImportData"

export const useImportDataMutation = () => {
    const { formData: configuration } = useImportConfigurationFormData()
    const format = useFormatImportData()

    return useMutation(
        async (data: File) => {
            const arrayBuffer = await data.arrayBuffer()
            const workbook = await read(arrayBuffer, { type: 'binary', dateNF: 'dd"/"mm"/"yyyy', cellDates: true })
            let excelData: Array<Record<string, any>> = []

            Object.keys(configuration).forEach((key) => {
                excelData = [
                    ...excelData,
                    ...format(utils.sheet_to_json(workbook.Sheets[key], { range: configuration[key]?.dataRange }) as Array<Record<string, any>>)
                ]
            })

            console.log(excelData)

            const result = await fetch(`${import.meta.env.VITE_API_URL}/import`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(excelData)
            })

            return result.json()
        },
    )
}