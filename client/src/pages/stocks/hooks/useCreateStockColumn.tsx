import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import _ from "lodash"
import { CircleMinus, CirclePlus } from "lucide-react"
import { v4 as uuid } from "uuid"
import { ComboBox } from "@/components/ComboBox"
import { TEntryStock } from "@/types/TEntryStock"
import { useFormData } from "@/hooks/useFormData"
import { EDITABLE_TABLE_FORMDATA_ID } from "../containers/CreateStocksContainer"
import { useFetchProduitFn } from "./useFetchProduitFn"

export const useCreateStockColumn = () => {
    const { formData, setFormData } = useFormData<Array<TEntryStock>>({
        id: EDITABLE_TABLE_FORMDATA_ID
    })

    const handleAddRow = useCallback(() => {
        setFormData((v) => ([
            ...v,
            { id: uuid() }
        ]))
    }, [formData])

    const handleRemoveRow = useCallback((index: number) => {
        const temp = _.clone(formData)
        temp.splice(index, 1)

        setFormData(temp)
    }, [formData])

    const columns = useMemo((): Array<ColumnDef<TEntryStock>> => {
        return [
            {
                accessorKey: 'actions',
                header: '',
                cell: ({row}) => {
                    if(row.index === formData?.length - 1){
                        return (
                            <CirclePlus className=" cursor-pointer" onClick={handleAddRow}/>
                        )
                    }

                    return (
                        <CircleMinus className=" cursor-pointer" onClick={() => handleRemoveRow(row.index)}/>
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
                            value={initialValue}
                            onSelectedOption={(val) => table.options.meta?.updateData(row.index, "produit", val)}
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
                            value={row?.original?.produit?.id}
                            readOnly
                            className="cursor-default"
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
            },
            {
                accessorKey: 'comments',
                header: 'Autres commentaires',
            }
        ]
    }, [formData])

    return columns
}