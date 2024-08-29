import { TEntryStock } from "@/types/TEntryStock"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"
import { useMemo } from "react"

export const useProductEntriesColumns = () => {
    return useMemo((): Array<ColumnDef<TEntryStock>> => {
        return [
            {
                id: "entryDate",
                accessorKey: "entryDate",
                header: "Date",
                cell: ({row}) => {
                    return (
                        <div className="min-w-[100px] max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
                            <span>{moment(row.original?.entryDate).format("DD MMMM YYYY")}</span>
                        </div>
                    )
                }
            },
            {
                id: "site.name",
                accessorKey: "site.name",
                header: "Site",
                cell: ({row}) => {
                    return (
                        <div className="min-w-[100px] max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
                            <span>{row.original?.site?.name}</span>
                        </div>
                    )
                }
            },
            {
                id: "poidsNet",
                accessorKey: "poidsNet",
                header: "Poids net",
                cell: ({row}) => {
                    return (
                        <div className="min-w-[100px] max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
                            <span>{row.original?.poidsNetKg?.toLocaleString()} kg</span>
                        </div>
                    )
                }
            },
            {
                id: "prix.prix",
                accessorKey: "prix.prix",
                header: "Prix unitaire",
                cell: ({row}) => {
                    return (
                        <div className="min-w-[100px] max-w-[120px] text-nowrap overflow-hidden text-ellipsis">
                            <span>{row.original?.prix?.prix?.toLocaleString()} Ar</span>
                        </div>
                    )
                }
            }
        ]
    }, [])
}