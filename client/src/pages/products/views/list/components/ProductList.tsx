import { useProductsQuery } from "@/pages/hooks/useProductsQuery"
import { Datatable } from "@/pages/components/Datatable"
import { useProductListColumns } from "../hooks/useProductListColumns"

export const ProductList = () => {
    const columns = useProductListColumns()
    const { data } = useProductsQuery()
    return (
        <Datatable
            data={data?.data}
            columns={columns}
            columnToFilter="id"
        />
    )
}