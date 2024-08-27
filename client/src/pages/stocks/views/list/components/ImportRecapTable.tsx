import { Datatable } from "@/pages/components/Datatable"
import { useRecapStocksDataQuery } from "../../../hooks/useRecapStocksDataQuery"
import { useRecapStocksDataColumns } from "../hooks/useRecapStocksDataColumns"
import { useSitesQuery } from "@/pages/hooks/useSitesQuery"
import _ from "lodash"
import { usePeriodFormData } from "../hooks/usePeriodFormData"
import moment from "moment"

export const ImportRecapTable = () => {
    const {formData} = usePeriodFormData()
    const { data: recap } = useRecapStocksDataQuery(moment(formData?.period).toISOString(true))
    const { data: sites } = useSitesQuery()
    const columns = useRecapStocksDataColumns()

    return (
        <Datatable
            data={ !_.isEmpty(sites?.data) ? recap : [] }
            columns={columns}
            columnToFilter="label"
        />
    )
}