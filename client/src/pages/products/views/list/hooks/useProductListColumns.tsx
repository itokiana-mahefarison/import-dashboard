import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

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
            },
            {
                id: 'actions',
                header: "Actions",
                cell: ({row}) => {
                    const navigate = useNavigate()

                    return (
                        <Button onClick={() => navigate(`${row.getValue("id")}`)}>
                            Details
                        </Button>
                    )
                },
                meta: {
                    className: "w-[250px]"
                }
            }
        ]
    }, [])

    return columns
}