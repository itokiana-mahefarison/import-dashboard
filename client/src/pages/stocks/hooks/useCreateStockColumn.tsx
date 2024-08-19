import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import _ from "lodash"
import { CircleMinus, CirclePlus } from "lucide-react"
import { ComboBox } from "@/components/ComboBox"
import { TEntryStock } from "@/types/TEntryStock"
import { useFetchProduitFn } from "./useFetchProduitFn"
import { Textarea } from "@/components/ui/textarea"
import { useFetchPrixProduitFn } from "./useFetchPrixProduitFn"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { useHttpMutation } from "@/hooks/useHttpMutation"
import { TPrixProduit } from "@/types/TPrixProduit"
import { useToast } from "@/components/ui/use-toast"
import { useQueryClient } from "react-query"

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

                    return (
                        <ComboBox
                            className="w-[170px]"
                            value={initialValue}
                            onSelectedOption={(val) => table.options.meta?.updateData?.(row.index, "produit", {id: val})}
                            fetchOptions={fetchProduitFn}
                            onFetchOptionsSuccess={(options) => {
                                return options.data?.map((item) => ({label: item.label, value: item.id}))
                            }}
                        />
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
                    const initialValue = row.original?.produit?.prix?.[0]?.id

                    const { mutate, isSuccess, data } = useHttpMutation<TPrixProduit>({
                        method: "POST",
                        controllerUrl: "prixproduit/insert"
                    })
                    const {toast} = useToast()
                    const queryClient = useQueryClient()

                    useEffect(() => {
                        if(isSuccess){
                            table.options.meta?.updateData?.(row.index, "produit", {
                                ...row?.original?.produit,
                                prix: [{id: data?.id}]
                            })
                            queryClient.invalidateQueries(["Prix.Produit.Fetch.Combobox"])
                        }
                    }, [isSuccess])

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
                            prix: parseInt(prix),
                            produit: {id: row?.original?.produit?.id},
                            createdAt: period
                        })
                    }, [row?.original])

                    return (
                        <ComboBox
                            id="Prix.Produit.Fetch.Combobox"
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
                                    label: `${item.prix}`,
                                    renderLabel: (
                                        <p> 
                                            {item?.createdAt && <span className="text-xs bg-foreground text-background mr-2 py-[1px] px-2 rounded-full">{moment(item.createdAt).format("DD/MM/YYYY")}</span>} 
                                            <span className="text-lg">{`${item.prix} Ar`}</span>
                                        </p>
                                    ), 
                                    value: item.id
                                }))
                            }}
                            onRenderNoResult={(prix) => row.original?.produit?.id ? (
                                <div className="grid gap-2 justify-center max-w-[200px] px-2">
                                    <span className="text-center text-xs">* Veuillez inscrire un nouveau montant</span>
                                    <Button onClick={() => handleOnAddPrice(prix)}>
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
                            className="w-[200px]"
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
                            className="w-[200px]"/>
                    )
                }
            }
        ]
    }, [period])

    return columns
}