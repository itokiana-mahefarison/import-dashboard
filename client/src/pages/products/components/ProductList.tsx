import { useProductsQuery } from "@/pages/hooks/useProductsQuery"
import { useProductListColumns } from "../hooks/useProductListColumns"
import { Datatable } from "@/pages/components/Datatable"

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