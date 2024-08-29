import { RangeValue } from "@/components/DateRangePicker"
import { useFormData } from "@/hooks/useFormData"
import moment from "moment"

export const useProductDetailsDateRange = (productId?: string) => {
    return useFormData<RangeValue>({
        id: `Product.${productId}.Details.Stats.DateRange`,
        formData: {
            from: moment().set("date", 1).toISOString(true),
            to: moment().set("date", 1).add(1, "month").toISOString(true)
        }
    })
}