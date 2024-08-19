import { Datatable } from "@/pages/components/Datatable"
import { useRecapStocksDataQuery } from "../../../hooks/useRecapStocksDataQuery"
import { useRecapStocksDataColumns } from "../hooks/useRecapStocksDataColumns"
import { useSitesQuery } from "@/pages/hooks/useSitesQuery"
import _ from "lodash"

export const ImportRecapTable = () => {
    const { data: recap } = useRecapStocksDataQuery()
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