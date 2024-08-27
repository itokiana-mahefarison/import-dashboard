import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import './style.css'

export const Tabs = (props: Props) => {
    return (
        <div className="tabs w-full flex justify-between items-end">
            <div className="flex items-center text-sm break-words">
                {
                    props.items.map((item, index) => {
                        const isActive = props.isMenuActive?.(item)

                        return (
                            <Link to={item.url} className={cn("item flex items-center gap-1", isActive && 'active')} key={index}>
                                {item.icon} {item.label}
                            </Link>
                        )
                    })
                }
            </div>
            {
                props.tools
            }
        </div>
    )
}

type Props = {
    items: Array<TabsItem>
    isMenuActive?: (item: TabsItem) => boolean
    tools?: React.ReactNode
}

type TabsItem = {
    label: string
    url: string
    icon?: React.ReactNode
}