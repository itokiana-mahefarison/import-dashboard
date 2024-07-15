import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateProductMutation } from "../hooks/useCreateProductMutation"
import { useFormData } from "@/hooks/useFormData"
import { useProductsQuery } from "@/pages/hooks/useProductsQuery"

const ProductCreateContainer = () => {
    const navigate = useNavigate()
    const handleClose = useCallback(() => {
        navigate('/stocks/create')
    }, [])

    const { formData, handleInputChange } = useFormData({})
    const { mutate, isSuccess } = useCreateProductMutation()
    const { invalidateQuery } = useProductsQuery()

    const handleOnSubmit = () => {
        mutate(formData)
    }

    useEffect(() => {
        if(isSuccess){
            invalidateQuery()
            handleClose()
        }
    }, [isSuccess])


    return (
        <Dialog open onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>
                        Ajouter un nouveau produit
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Code
                        </Label>
                        <Input value={formData?.id} onChange={(e) => handleInputChange('id', e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Nom
                        </Label>
                        <Input value={formData?.label} onChange={(e) => handleInputChange('label', e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Classe
                        </Label>
                        <Input value={formData?.class} onChange={(e) => handleInputChange('class', e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleOnSubmit}>
                        Valider
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProductCreateContainer