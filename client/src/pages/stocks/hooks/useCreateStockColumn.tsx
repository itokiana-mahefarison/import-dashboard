import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useCreateStockFormData } from "./useCreateStockFormData"
import { Input } from "@/components/ui/input"
import _ from "lodash"
import { CircleMinus, CirclePlus } from "lucide-react"
import { v4 as uuid } from "uuid"
import { ComboBox } from "@/components/ComboBox"
import { TEntryStock } from "@/types/TEntryStock"

export const useCreateStockColumn = () => {
    const { formData, setFormData } = useCreateStockFormData()

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
                    const [value, setValue] = useState(row.original?.produit?.id)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "produit", value)
                    }

                    useEffect(() => {
                        setValue(row.original?.produit?.id)
                    }, [row.original?.produit?.id])

                    return (
                        <ComboBox
                            value={(row.original?.produit?.id)}
                            options={[]}
                            onSelectedOption={(val) => setValue(val)}
                            onBlur={handleOnBlur}
                        />
                    )
                },
                enableHiding: false,
                enableSorting: false,
                enableColumnFilter: false
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
                cell: ({row, table}) => {
                    const [value, setValue] = useState<string>(row?.getValue("poidsBrutKg"))

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "poidsBrutKg", value)
                    }

                    useEffect(() => {
                        setValue(row.getValue("poidsBrutKg"))
                    }, [row.getValue("poidsBrutKg")])

                    return (
                        <Input 
                            value={row?.getValue('poidsBrutKg')} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: "tareKg",
                header: "Tare en KG",
                cell: ({row, table}) => {
                    const [value, setValue] = useState<string>(row?.getValue("tareKg"))

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "tareKg", value)
                    }

                    useEffect(() => {
                        setValue(row.getValue("tareKg"))
                    }, [row.getValue("tareKg")])

                    return (
                        <Input 
                            value={row?.getValue("tareKg")} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: "poidsNetKg",
                header: "Poids net en KG",
                cell: ({row, table}) => {
                    const [value, setValue] = useState<string>(row?.getValue("poidsNetKg"))

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "poidsNetKg", value)
                    }

                    useEffect(() => {
                        setValue(row.getValue("poidsNetKg"))
                    }, [row.getValue("poidsNetKg")])

                    return (
                        <Input 
                            value={row?.getValue('poidsNetKg')} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: 'observation',
                header: "Observations",
                cell: ({row, table}) => {
                    const [value, setValue] = useState<string>(row?.getValue("observation"))

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "observation", value)
                    }

                    useEffect(() => {
                        setValue(row.getValue("observation"))
                    }, [row.getValue("observation")])
                    return (
                        <Input 
                            value={row.getValue('observation')} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: 'comments',
                header: 'Autres commentaires',
                cell: ({row, table}) => {
                    const [value, setValue] = useState<string>(row?.getValue("comments"))

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "comments", value)
                    }

                    useEffect(() => {
                        setValue(row.getValue("comments"))
                    }, [row.getValue("comments")])

                    return (
                        <Input 
                            value={row.getValue('comments')} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            }
        ]
    }, [formData])

    return columns
}