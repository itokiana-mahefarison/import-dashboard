import { ComboBox } from "@/components/ComboBox"
import { DatePicker } from "@/components/DatePicker"
import { Label } from "@/components/ui/label"
import { TSite } from "@/types/TSite"
import { useEffect, useMemo, useState } from "react"
import { ContentLayout } from "@/pages/components/ContentLayout"
import _ from "lodash"
import { EditableTable } from "@/pages/components/EditableTable"
import { v4 as uuid } from "uuid"
import { ColumnDef } from "@tanstack/react-table"
import { TEntryStock } from "@/types/TEntryStock"
import { Input } from "@/components/ui/input"
import { useHttpMutation } from "@/hooks/useHttpMutation"
import { useToast } from "@/components/ui/use-toast"
import { useCreateStockColumn } from "../hooks/useCreateStockColumn"
import { useFetchSiteFn } from "../hooks/useFetchSiteFn"
import { useRecapStocksDataQuery } from "@/pages/stocks/hooks/useRecapStocksDataQuery"
import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useFormData } from "@/hooks/useFormData"

const CreateStocksContainer = () => {
    const navigate = useNavigate()

    const [site, setSite] = useState<TSite>()
    const [period, setPeriod] = useState<string>()
    const columns = useCreateStockColumn(period)
    const {toast} = useToast()
    const { mutate, isSuccess, data, isLoading } = useHttpMutation({
        method: "POST",
        controllerUrl: "entrystock/insertBatch"
    })

    const { invalidateQuery } = useRecapStocksDataQuery()

    useEffect(() => {
        if(isSuccess){
            setSite(undefined)
            setPeriod(undefined)
            invalidateQuery()
            toast({
                title: "Creation des stocks",
                description: `${data?.rows} lignes d'entrées de stocks ont été ajoutés`
            })
        }
    }, [isSuccess, data])

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
                    table.options.meta?.updateData?.(row.index, column.id, value)
                }
    
                return (
                    <Input
                        className="w-[100px]"
                        value={value ?? ""}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={handleOnBlur}/>
                )
            }
        }
    }, [])
 
    const { setFormData } = useFormData<Array<TEntryStock>>({
        id: EDITABLE_TABLE_FORMDATA_ID
    })

    useEffect(() => {
        setFormData([
            {
                id: uuid()
            }
        ])
    }, [site, period])

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
                    <div className="flex items-center gap-2">
                        <ComboBox
                            id="site_data"
                            value={site?.id}
                            onSelectedOption={(val) => setSite({id: val})}
                            fetchOptions={fetchSiteFn}
                            onFetchOptionsSuccess={(options) => {
                                return options.data?.map((item) => ({label: item?.name, value: item?.id}))
                            }}
                        />
                        <Button className="h-9" onClick={() => navigate("site-create")}>
                            <Plus/>
                        </Button>
                    </div>
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
                {
                    site && period && (
                        <EditableTable
                            id={EDITABLE_TABLE_FORMDATA_ID}
                            isLoading={isLoading}
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
                    )
                }
                
            </div>
            <Outlet/>
        </ContentLayout>
    )
}

export const EDITABLE_TABLE_FORMDATA_ID = "entry_stock_id"

export default CreateStocksContainer