import { StatsBlock } from "@/components/stats/StatsBlock"
import { useHttpQuery } from "@/hooks/useHttpQuery"
import { TProductStats } from "@/types/TProduit"
import { Package } from "lucide-react"
import { useParams } from "react-router-dom"
import { PricesChart } from "../components/PricesChart"
import { StocksBySitePieChart } from "../components/StocksBySitePieChart"
import { useProductDetailsDateRange } from "../../../hooks/useProductDetailsDateRange"

const ProductDetailsStats = () => {
    const {id} = useParams()
    const {formData: dateRange} = useProductDetailsDateRange(id)

    const { data } = useHttpQuery<TProductStats>({
        controllerURl: `stats/${id}`,
        queryKey: ["produit_data", id, 'stats', dateRange],
        data: dateRange,
        options: {
            suspense: true,
            enabled: dateRange?.from !== undefined && dateRange?.to !== undefined
        }
    })

    const currencyFormatter = new Intl.NumberFormat("fr-FR")

    return (
        <div className="grid gap-3">
            <div className="grid grid-cols-3 gap-3 mt-2">
                <StatsBlock
                    icon={<Package/>}
                    title="Stock total"
                    value={`${data?.totalStock || 0} Kg`}
                />
                <StatsBlock
                    icon={<Package/>}
                    title="Montant total"
                    value={`Ar ${currencyFormatter.format(data?.totalAmount || 0)}`}
                />
                <StatsBlock
                    icon={<Package/>}
                    title="Sites associés aux stocks"
                    value={`${data?.stockBySite?.length || 0}`}
                />
            </div>
            <div className="grid grid-cols-12 gap-3">
                <PricesChart
                    prices={data?.allPrices || []}
                    className="col-span-8"
                />
                <StocksBySitePieChart
                    className="col-span-4"
                    totalStocks={data?.totalStock || 0}
                    stocksBySite={data?.stockBySite || []}
                />
            </div>
        </div>
    )
}

export default ProductDetailsStats