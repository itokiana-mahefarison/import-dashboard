import { useFormData } from "@/hooks/useFormData"
import moment from "moment"

export const usePeriodFormData = () => {
    const now = moment()

    const formData = useFormData<PeriodFormData>({
        id: "Period.FormData.Recap.Stock",
        formData: {
            period: moment(`01/${now.month() + 1}/${now.year()}`, "DD/MM/YYYY").toISOString(true)
        }
    })

    return {
        ...formData
    }
}

type PeriodFormData = {
    period?: string
}