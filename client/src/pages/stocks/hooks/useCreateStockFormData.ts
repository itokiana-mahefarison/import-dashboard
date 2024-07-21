import { useFormData } from "@/hooks/useFormData"
import { TEntryStock } from "@/types/TEntryStock"
import { v4 as uuid } from "uuid"

export const useCreateStockFormData = () => {
    return useFormData<Array<TEntryStock>>({
        id: 'create-stock-formData',
        formData: [
            {
                id: uuid()
            }
        ]
    })
}