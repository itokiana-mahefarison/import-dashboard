import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PageContentLoader } from "@/pages/components/PageContentLoader"
import { Suspense, useCallback, useEffect } from "react"
import { StockCreateForm } from "../components/StockCreateForm"
import { useNavigate } from "react-router-dom"
import { useFormData } from "@/hooks/useFormData"
import { useCreateStockMutation } from "../hooks/useCreateStockMutation"
import { useRecapStocksDataQuery } from "@/pages/stocks/hooks/useRecapStocksDataQuery"

const StockCreateContainer = () => {
    const navigate = useNavigate()
    const { formData } = useFormData({
        id: "stock-formData"
    })
    const { mutate, isSuccess } = useCreateStockMutation()
    const handleSubmit = useCallback(() => {
        mutate(formData)
    }, [formData])

    const { invalidateQuery } = useRecapStocksDataQuery()

    const handleCreateSite = () => {
        navigate('/stocks/site')
    }

    const handleCreateProduct = () => {
        navigate('/stocks/product')
    }

    const handleClose = useCallback(() => {
        navigate("/stocks")
    }, [])

    useEffect(() => {
        if(isSuccess){
            invalidateQuery()
        }
    }, [isSuccess])

    return (
        <>
            <Dialog open onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter une entrée de stock</DialogTitle>
                    </DialogHeader>
                    <Suspense fallback={<PageContentLoader/>}>
                        <StockCreateForm
                            onCreateSite={handleCreateSite}
                            onCreateProduct={handleCreateProduct}
                        />
                    </Suspense>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                            Valider
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default StockCreateContainer