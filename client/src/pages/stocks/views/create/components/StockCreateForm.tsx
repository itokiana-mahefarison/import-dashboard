import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormData } from "@/hooks/useFormData"
import { useProductsQuery } from "@/pages/hooks/useProductsQuery"
import { useSitesQuery } from "@/pages/hooks/useSitesQuery"
import { SquarePlus } from "lucide-react"
import { v4 as uuid } from "uuid"
import moment from "moment"

export const StockCreateForm = (props: Props) => {
    const { formData, handleInputChange } = useFormData({
        id: 'stock-formData',
        formData: {
            id: uuid(),
            entryDate: moment().toISOString()
        }
    })
    const { data: products } = useProductsQuery()

    const { data: sites } = useSitesQuery()

    return (
        <>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Site
                    </Label>
                    <div className="flex items-center col-span-3 gap-2">
                        <Select value={formData?.site?.id} onValueChange={(value) => handleInputChange('site', {id: value})}>
                            <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Selectionner le site parmi les options"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        (sites.data as Array<any>).map((item)=> {
                                            return <SelectItem value={item?.id}>{item?.name}</SelectItem>
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <SquarePlus className="cursor-pointer" onClick={props.onCreateSite} />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Produit
                    </Label>
                    <div className="flex items-center col-span-3 gap-2">
                        <Select value={formData?.produit?.id} onValueChange={(value) => handleInputChange("produit", {id: value})}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Selectionner le produit parmi les options"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        (products?.data as Array<any>).map((item) => {
                                            return <SelectItem value={item?.id}>{item?.label}</SelectItem>
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <SquarePlus className="cursor-pointer" onClick={props.onCreateProduct} />
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Poids brut en kg
                    </Label>
                    <Input className="col-span-3" value={formData?.poidsBrutKg} onChange={(e) => handleInputChange('poidsBrutKg', e.target.value)}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Tare en kg
                    </Label>
                    <Input className="col-span-3" value={formData?.tareKg} onChange={(e) => handleInputChange('tareKg', e.target.value)}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Poids net en kg
                    </Label>
                    <Input className="col-span-3" value={formData?.poidsNetKg} onChange={(e) => handleInputChange('poidsNetKg', e.target.value)}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Observation
                    </Label>
                    <Input className="col-span-3" value={formData?.observation} onChange={(e) => handleInputChange('observation', e.target.value)}/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Autres commentaires
                    </Label>
                    <Input className="col-span-3" value={formData?.comments} onChange={(e) => handleInputChange('comments', e.target.value)}/>
                </div>
            </div>
        </>
    )
}

type Props = {
    onCreateProduct?: () => void,
    onCreateSite?: () => void
}