import { Separator } from "@/components/ui/separator"
import moment from "moment"
import { useMemo } from "react"
import _ from "lodash"
import { ComboBox } from "@/components/ComboBox"

export const PeriodSelection = (props: Props) => {

    const months = useMemo(() => {
        return _.times(12).map((i) => {
            return {
                label: _.upperFirst(moment(`01/${i+1}/2024`, "DD/MM/YYYY").format("MMMM")),
                value: i
            }
        })
    }, [])

    const years = useMemo(() => {
        return _.range(1970, moment().year() + 1).reverse().map((i) => {
            return {
                label: i.toString(),
                value: i
            }
        })
    }, [])
    
    return (
        <div 
            className="flex items-center border border-input
                        bg-background hover:bg-accent hover:text-accent-foreground
                        rounded-md transition-colors">
            <ComboBox
                buttonVariant={"ghost"}
                options={months}
                value={moment(props.period).month()}
                onSelectedOption={(val) => {
                    const date = moment(props.period).month(val).toISOString(true)
                    props.onSelectPeriod?.(date)
                }}
            />
            <Separator orientation="vertical" />
            <ComboBox
                buttonVariant={"ghost"}
                options={years}
                value={moment(props.period).year()}
                onSelectedOption={(val) => {
                    const date = moment(props.period).year(val).toISOString(true)
                    props.onSelectPeriod?.(date)
                }}
            />
        </div>
    )
}

type Props = {
    onSelectPeriod?: (val: string) => void
    period?: string
}