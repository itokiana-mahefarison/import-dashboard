import { ComboBox } from "@/components/ComboBox"
import { DatePicker } from "@/components/DatePicker"
import { Label } from "@/components/ui/label"
import { Datatable } from "@/pages/components/Datatable"
import { TSite } from "@/types/TSite"
import { useCallback, useState } from "react"
import { useCreateStockColumn } from "../hooks/useCreateStockColumn"
import { useCreateStockFormData } from "../hooks/useCreateStockFormData"
import { ContentLayout } from "@/pages/components/ContentLayout"
import _ from "lodash"

const CreateStocksContainer = () => {
    const [site, setSite] = useState<TSite>()
    const [period, setPeriod] = useState<string>()
    const columns = useCreateStockColumn()
    const { formData, setFormData } = useCreateStockFormData()

    const handleInputChange = useCallback((index: number, key: string, val: any) => {
        const temp = _.cloneDeep(formData)
        const entry = {
            ...temp[index],
            [key]: val
        }

        temp.splice(index, 1, entry)

        setFormData(temp)
    }, [formData])

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
                        options={[
                            {
                                label: "Hello",
                                value: "hello"
                            }
                        ]}
                        onSelectedOption={(val) => setSite({id: val})}
                        onInputChange={(val) => console.log(val)}
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
                <Datatable
                    columns={columns}
                    data={formData}
                    hideFilterInput
                    hideFitlerColumn
                    onUpdateRow={handleInputChange}
                />
                
            </div>
        </ContentLayout>
    )
}

export default CreateStocksContainer