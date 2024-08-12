import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import _ from "lodash"
import { CircleMinus, CirclePlus } from "lucide-react"
import { ComboBox } from "@/components/ComboBox"
import { TEntryStock } from "@/types/TEntryStock"
import { useFetchProduitFn } from "./useFetchProduitFn"
import { Textarea } from "@/components/ui/textarea"

export const useCreateStockColumn = () => {
    

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
                            onBlur={handleOnBlur}/>
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
                            onBlur={handleOnBlur}/>
                    )
                }
            }
        ]
    }, [])

    return columns
}