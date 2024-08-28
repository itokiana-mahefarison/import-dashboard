import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "../ui/card"

export const StatsBlock = (props: Props) => {
    return (
        <Card className={cn("min-w-52", props.isActive && "border-[2px] border-primary")}>
            <CardHeader className="px-4 py-4">
                <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center">
                    {
                        props.icon
                    }
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-1">
                    <h3 className="font-semibold text-sm">{props.title}</h3>
                    <span className="font-bold text-3xl overflow-hidden text-ellipsis">{props.value}</span>
                </div>
            </CardContent>
        </Card>
    )
}

type Props = {
    title: string
    value: string
    icon: React.ReactNode
    isActive?: boolean
}