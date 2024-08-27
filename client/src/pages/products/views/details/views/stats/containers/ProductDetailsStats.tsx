import { StatsBlock } from "@/components/stats/StatsBlock"
import { Package } from "lucide-react"

const ProductDetailsStats = () => {
    return (
        <div className="grid grid-cols-4 gap-3 mt-2">
            <StatsBlock
                icon={<Package/>}
                title="test"
                value="Ar 12 000"
            />
            <StatsBlock
                icon={<Package/>}
                title="test"
                value="Ar 12 000"
            />
            <StatsBlock
                icon={<Package/>}
                title="test"
                value="Ar 12 000"
            />
            <StatsBlock
                icon={<Package/>}
                title="test"
                value="Ar 12 000"
            />
        </div>
    )
}

export default ProductDetailsStats