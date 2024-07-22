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
                    const initialValue = row.original?.produit?.id
                    const [value, setValue] = useState(initialValue)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "produit", value)
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])

                    return (
                        <ComboBox
                            value={value}
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
                            tabIndex={1}
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
                cell: ({row, table, getValue}) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState<string>(initialValue)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "poidsBrutKg", value)
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])

                    return (
                        <Input 
                            tabIndex={2}
                            value={value} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: "tareKg",
                header: "Tare en KG",
                cell: ({row, table, getValue}) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState<string>(initialValue)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "tareKg", value)
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])

                    return (
                        <Input 
                            tabIndex={3}
                            value={value} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: "poidsNetKg",
                header: "Poids net en KG",
                cell: ({row, table, getValue}) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState<string>(initialValue)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "poidsNetKg", value)
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])

                    return (
                        <Input 
                            tabIndex={4}
                            value={value} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: 'observation',
                header: "Observations",
                cell: ({row, table, getValue}) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState<string>(initialValue)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "observation", value)
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])
                    return (
                        <Input 
                            tabIndex={5}
                            value={value} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            },
            {
                accessorKey: 'comments',
                header: 'Autres commentaires',
                cell: ({row, table, getValue}) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState<string>(initialValue)

                    const handleOnBlur = () => {
                        table.options.meta?.updateData(row.index, "comments", value)
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])

                    return (
                        <Input 
                            tabIndex={6}
                            value={value} 
                            onBlur={handleOnBlur}
                            onChange={(e) => setValue(e.target.value)}/>
                    )
                }
            }
        ]
    }, [formData])

    return columns
}