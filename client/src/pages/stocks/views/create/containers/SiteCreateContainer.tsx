import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormData } from "@/hooks/useFormData"
import { useNavigate } from "react-router-dom"
import { useCreateSiteMutation } from "../hooks/useCreateSiteMutation"
import { useCallback, useEffect } from "react"
import { useSitesQuery } from "@/pages/hooks/useSitesQuery"

const SiteCreateContainer = () => {
    const navigate = useNavigate()
    const handleClose = useCallback(() => {
        navigate('/stocks/create')
    }, [])
    const { formData, handleInputChange } = useFormData({})
    const { mutate, isSuccess } = useCreateSiteMutation()
    const { invalidateQuery } = useSitesQuery()

    const handleSubmit = useCallback(() => {
        mutate(formData)
    }, [formData])

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
                        Ajouter un nouveau site
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
                        <Input value={formData?.name} onChange={(e) => handleInputChange('name', e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>
                        Valider
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SiteCreateContainer