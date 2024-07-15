import { ContentLayout } from "@/pages/components/ContentLayout"
import { UploadForm } from "../components/UploadForm"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { ImportConfigurationItem } from "../components/ImportConfigurationItem"
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
import { useExcelSheets } from "@/hooks/xlsx/useExcelSheets"
import { Badge } from "@/components/ui/badge"
import { useImportConfigurationFormData } from "../hooks/useImportConfigurationFormData"
import { useImportDataMutation } from "../hooks/useImportDataMutation"
import { useRecapStocksDataQuery } from "../hooks/useRecapStocksDataQuery"

const ImportStocksContainer = () => {
    const [file, setFile] = useState<File | undefined>()
    const handleSubmitFile = useCallback((file: File) => {
        setFile(file)
    }, [])
    const {isLoading, sheets} = useExcelSheets(file, true)
    const { formData, handleInputChange, reset } = useImportConfigurationFormData()

    const [selectedSheet, setSelectedSheet] = useState<string>()
    const [currentDataRange, setCurrentDataRange] = useState<string>()
    const [openDialog, setOpenDialog] = useState<boolean>()

    const { mutate, isSuccess } = useImportDataMutation()
    const { invalidateQuery } = useRecapStocksDataQuery()

    const resetForm = () => {
        setSelectedSheet(undefined)
        setCurrentDataRange(undefined)
    }

    const handleImportData = useCallback(() => {
        if(file){
            mutate(file)
        }
    }, [mutate, file])

    useEffect(() => {
        reset()
    }, [file])

    useEffect(() => {
        if(isSuccess){
            invalidateQuery()
        }
    }, [])

    return (
        <ContentLayout 
            title="Importer un fichier stock" 
            breadCrumbs={
                [
                    {
                        label: 'Accueil',
                        url: '/'
                    },
                    {
                        label: 'Stocks',
                        url: '/stocks'
                    },
                    {
                        label: "Importer"
                    }
                ]
            }
        >
            <div className="grid gap-5">
                <div className="grid gap-2">
                    { file && (
                        <div className="flex items-center justify-between">
                            <Badge variant={"secondary"}>
                                <span className="flex items-center gap-3">
                                    {file.name}
                                    <X size={12} className="cursor-pointer" onClick={() => setFile(undefined)} />
                                </span>
                            </Badge>
                            <div className="flex items-center gap-3">
                                <Button onClick={() => setOpenDialog(true)}>
                                    <Plus/>
                                    Ajouter une configuration
                                </Button>
                                <Button onClick={handleImportData}>
                                    Importer les données
                                </Button>
                            </div>
                        </div>
                    )}
                    <UploadForm onSubmited={(value) => handleSubmitFile(value[0])} isLoading={isLoading}/>
                </div>
                {
                    sheets && (
                        <>
                            <div className="flex w-full justify-between">
                                <h2 className="font-bold">Configurations d'importation</h2>
                            </div>
                            <div className="flex items-center gap-5 flex-wrap">
                                {
                                    Object.keys(formData).map((key, index) => {
                                        return (
                                            <ImportConfigurationItem sheetName={key} dataRange={formData[key]?.dataRange || ""} key={index}/>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                }
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Configuration</DialogTitle>
                        <DialogDescription>
                            Cette configuration sera utilisé lors de l'import.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nom de la feuille
                            </Label>
                            <Select value={selectedSheet} onValueChange={(value) => setSelectedSheet(value)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Selectionner parmi les feuilles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Feuilles</SelectLabel>
                                        {
                                            sheets?.map((item) => {
                                                return <SelectItem value={item}>{item}</SelectItem>
                                            })
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Place de données
                            </Label>
                            <Input
                                id="username"
                                placeholder="A1:A8"
                                className="col-span-3"
                                value={currentDataRange}
                                onChange={(event) => {
                                    setCurrentDataRange(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => {
                            if(selectedSheet){
                                handleInputChange(selectedSheet, {dataRange: currentDataRange})
                                setOpenDialog(false)
                                resetForm()
                            }
                        }}>
                            Valider
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ContentLayout>
    )
}

export default ImportStocksContainer