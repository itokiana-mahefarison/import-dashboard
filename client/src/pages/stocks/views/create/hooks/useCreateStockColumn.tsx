import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import _ from "lodash"
import { CircleMinus, CirclePlus, Plus } from "lucide-react"
import { ComboBox } from "@/components/ComboBox"
import { TEntryStock } from "@/types/TEntryStock"
import { Textarea } from "@/components/ui/textarea"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { useHttpMutation } from "@/hooks/useHttpMutation"
import { TPrixProduit } from "@/types/TPrixProduit"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "react-query"
import { useFetchProduitFn } from "./useFetchProduitFn"
import { useFetchPrixProduitFn } from "./useFetchPrixProduitFn"
import { useNavigate } from "react-router-dom"

export const useCreateStockColumn = (period?: string) => {
    

    const columns = useMemo((): Array<ColumnDef<TEntryStock>> => {
        return [
            {
                accessorKey: 'actions',
                header: '',
                cell: ({row, table}) => {
                    if(row.index === table.getRowCount() - 1){
                        return (
                            <CirclePlus className=" cursor-pointer" onClick={table?.options?.meta?.addRow}/>
                        )
                    }

                    return (
                        <CircleMinus className=" cursor-pointer" onClick={() => table?.options?.meta?.removeRow?.(row.index)}/>
                    )
                }
            },
            {
                accessorKey: 'produit',
                header: 'Nom du produit',
                cell: ({row, table}) => {
                    const fetchProduitFn = useFetchProduitFn()
                    const initialValue = row.original?.produit?.id
                    const navigate = useNavigate()

                    return (
                        <div className="flex items-center gap-2">
                            <ComboBox
                                id="produit_data"
                                className="w-[170px]"
                                value={initialValue}
                                onSelectedOption={(val) => table.options.meta?.updateData?.(row.index, "produit", {id: val})}
                                fetchOptions={fetchProduitFn}
                                onFetchOptionsSuccess={(options) => {
                                    return options.data?.map((item) => ({label: item.label, value: item.id}))
                                }}
                            />
                            <Button className="h-9" onClick={() => navigate("product-create")}>
                                <Plus/>
                            </Button>

                        </div>
                        
                    )
                }
            },
            {
                accessorKey: 'produit.id',
                header: 'Code produit',
                cell: ({row}) => {
                    return (
                        <Input
                            value={row?.original?.produit?.id ?? ""}
                            readOnly
                            className="cursor-not-allowed w-[150px]"
                        />
                    )
                }
            },
            {
                accessorKey: 'prix',
                header: 'Prix du produit',
                cell: ({row, table}) => {
                    const fetchPrixProduitFn = useFetchPrixProduitFn(row?.original?.produit?.id, period)
                    const initialValue = row.original?.prix?.id

                    const { mutate, isSuccess, data } = useHttpMutation<TPrixProduit>({
                        method: "POST",
                        controllerUrl: "prixproduit/insert"
                    })
                    const {toast} = useToast()
                    const queryClient = useQueryClient()

                    useEffect(() => {
                        if(isSuccess){
                            table.options.meta?.updateData?.(row.index, "prix", {id: data?.id})
                            queryClient.invalidateQueries("prix_produit_data")
                        }
                    }, [isSuccess, data])

                    const handleOnAddPrice = useCallback((prix?: string) => {
                        if(prix === undefined){
                            toast({
                                title: "Ajout d'un nouveau prix",
                                description: "Veuillez renseigner le prix",
                                variant: "destructive"
                            })
                            return
                        }

                        mutate({
                            prix: parseFloat(prix?.trim()?.replace(/\s/g, '')?.replace(/,/g, '.')),
                            produit: {id: row?.original?.produit?.id},
                            createdAt: period
                        })
                    }, [row?.original, period])

                    const currencryFormater = new Intl.NumberFormat('fr-FR');

                    return (
                        <ComboBox
                            id="prix_produit_data"
                            dependencies={{
                                product: row?.original?.produit?.id,
                                period
                            }}
                            className="w-[170px]"
                            value={initialValue}
                            onSelectedOption={(val, option) => {
                                if(!val){
                                    return
                                }

                                handleOnAddPrice(option?.label)
                            }}
                            fetchOptions={fetchPrixProduitFn}
                            onEnableFetch={() => row?.original?.produit?.id !== undefined}
                            onFetchOptionsSuccess={(options) => {
                                return options.data?.map((item) => ({
                                    label: currencryFormater.format(item.prix!),
                                    renderLabel: (
                                        <p> 
                                            {item?.createdAt && <span className="text-xs bg-foreground text-background mr-2 py-[1px] px-2 rounded-full">{moment(item.createdAt).format("DD/MM/YYYY")}</span>} 
                                            <span className="text-lg">{`${currencryFormater.format(item.prix!)} Ar`}</span>
                                        </p>
                                    ), 
                                    value: item.id
                                }))
                            }}
                            onRenderNoResult={(prix, closeDialog) => row.original?.produit?.id ? (
                                <div className="grid gap-2 justify-center max-w-[200px] px-2">
                                    <span className="text-center text-xs">* Veuillez inscrire un nouveau montant</span>
                                    <Button onClick={() => {
                                        handleOnAddPrice(prix)
                                        closeDialog?.()
                                    }}>
                                        Ajouter un nouveau prix
                                    </Button>
                                </div>
                            ) : (
                                <span className="text-sm">* Veuillez choisir le produit</span>
                            )}
                            placeholder="-"
                            prefix={(
                                <span>
                                    Ar
                                </span>
                            )}
                        />
                    )
                }
            },
            {
                accessorKey: 'poidsBrutKg',
                header: "Poids brut en KG",
            },
            {
                accessorKey: "tareKg",
                header: "Tare en KG",
            },
            {
                accessorKey: "poidsNetKg",
                header: "Poids net en KG",
            },
            {
                accessorKey: 'observation',
                header: "Observations",
                cell: ({ row, table, getValue, column }) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState(initialValue)
        
                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])
        
                    const handleOnBlur = () => {
                        table.options.meta?.updateData?.(row.index, column.id, value)
                    }
        
                    return (
                        <Textarea
                            value={value ?? ""}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={handleOnBlur}
                            className="min-w-[200px] min-h-[40px]"
                            />
                    )
                }
            },
            {
                accessorKey: 'comments',
                header: 'Autres commentaires',
                cell: ({ row, table, getValue, column }) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState(initialValue)
        
                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])
        
                    const handleOnBlur = () => {
                        table.options.meta?.updateData?.(row.index, column.id, value)
                    }
        
                    return (
                        <Textarea
                            value={value ?? ""}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={handleOnBlur}
                            className="min-w-[200px] min-h-[40px]"/>
                    )
                }
            }
        ]
    }, [period])

    return columns
}