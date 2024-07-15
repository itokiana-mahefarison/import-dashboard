import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useProductListColumns = () => {
    const columns = useMemo((): ColumnDef<Record<string, any>>[] => {
        return [
            {
                id: "id",
                accessorKey: "id",
                header: "Code",
                cell: ({row}) => {
                    return <span>{row.getValue("id")}</span>
                },
            },
            {
                id: "label",
                accessorKey: "label",
                header: "Nom",
                cell: ({row}) => {
                    return <span>{row.getValue('label')}</span>
                }
            },
            {
                id: "class",
                accessorKey: "class",
                header: "Classe",
                cell: ({row}) => {
                    return <span>{row.getValue('class')}</span>
                }
            }
        ]
    }, [])

    return columns
}