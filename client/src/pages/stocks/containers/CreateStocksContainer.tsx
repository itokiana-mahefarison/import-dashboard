import { ComboBox } from "@/components/ComboBox"
import { DatePicker } from "@/components/DatePicker"
import { Label } from "@/components/ui/label"
import { TSite } from "@/types/TSite"
import { useEffect, useMemo, useState } from "react"
import { useCreateStockColumn } from "../hooks/useCreateStockColumn"
import { ContentLayout } from "@/pages/components/ContentLayout"
import _ from "lodash"
import { useFetchSiteFn } from "../hooks/useFetchSiteFn"
import { EditableTable } from "@/pages/components/EditableTable"
import { v4 as uuid } from "uuid"
import { ColumnDef } from "@tanstack/react-table"
import { TEntryStock } from "@/types/TEntryStock"
import { Input } from "@/components/ui/input"
import { useHttpMutation } from "@/hooks/useHttpMutation"

const CreateStocksContainer = () => {
    const [site, setSite] = useState<TSite>()
    const [period, setPeriod] = useState<string>()
    const columns = useCreateStockColumn()
    const { mutate } = useHttpMutation({
        method: "POST",
        controllerUrl: "entrystock/insertBatch"
    })

    const fetchSiteFn = useFetchSiteFn()

    const defaultColumn = useMemo((): Partial<ColumnDef<TEntryStock>> => {
        return {
            cell: ({ row, table, getValue, column }) => {
                const initialValue = getValue() as string
                const [value, setValue] = useState(initialValue)
    
                useEffect(() => {
                    setValue(initialValue)
                }, [initialValue])
    
                const handleOnBlur = () => {
                    table.options.meta?.updateData(row.index, column.id, value)
                }
    
                return (
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleOnBlur}/>
                )
            },
            enableHiding: false,
            enableSorting: false,
            enableColumnFilter: false
        }
    }, [])
    return (
        <ContentLayout
            title="Insérer un tableau de stocks"
            breadCrumbs={[
                {
                    label: "Accueil"
                },
                {
                    label: "Stocks",
                    url: '/stocks'
                },
                {
                    label: "Insérer un tableau de stocks"
                }
            ]}
        >
            <div className="flex flex-col gap-5">
                <div className="grid gap-2 w-[300px]">
                    <Label>
                        Site
                    </Label>
                    <ComboBox
                        value={site?.id}
                        onSelectedOption={(val) => setSite({id: val})}
                        fetchOptions={fetchSiteFn}
                        onFetchOptionsSuccess={(options) => {
                            return options.data?.map((item) => ({label: item?.name, value: item?.id}))
                        }}
                    />
                </div>
                <div className="grid gap-2 w-[300px]">
                    <Label>
                        Période
                    </Label>
                    <DatePicker
                        value={period}
                        onChange={(val) => setPeriod(val)}
                    />
                </div>
                <EditableTable
                    id={EDITABLE_TABLE_FORMDATA_ID}
                    defaultColumn={defaultColumn}
                    columns={columns}
                    defaultValue={[
                        {
                            id: uuid()
                        }
                    ]}
                    onBeforeSaving={(data) => {
                        return data.map((item) => {
                            return {
                                ...item,
                                site,
                                entryDate: period
                            }
                        })
                    }}
                    onSaving={(data) => mutate(data)}
                />
                
            </div>
        </ContentLayout>
    )
}

export const EDITABLE_TABLE_FORMDATA_ID = "entry_stock_id"

export default CreateStocksContainer