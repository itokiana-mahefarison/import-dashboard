import { ComponentProps } from "react"
import { NavBar } from "./NavBar"
import { Link } from "react-router-dom"
import _ from "lodash"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export const ContentLayout = ({ title, children, breadCrumbs }: Props) => {
    return (
        <div className="h-full">
            <NavBar title={title} />
            <div className="grid gap-5 pt-8 pb-8 px-4 sm:px-8">
                {
                    !_.isEmpty(breadCrumbs) && (
                        <Breadcrumb>
                            <BreadcrumbList>
                                {
                                    breadCrumbs.map((item, index, list) => {
                                        return (
                                            <>
                                                {
                                                    item?.url ?
                                                    <BreadcrumbItem key={index}>
                                                        <BreadcrumbLink asChild>
                                                            <Link to={item?.url}>
                                                                {item.label}
                                                            </Link>
                                                        </BreadcrumbLink>
                                                    </BreadcrumbItem> :
                                                    <BreadcrumbItem key={index}>
                                                        <BreadcrumbPage>
                                                            {item.label}
                                                        </BreadcrumbPage>
                                                    </BreadcrumbItem>
                                                }
                                                { index < list.length-1 && <BreadcrumbSeparator/> }
                                            </>
                                        )
                                    })
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    )
                }
                {children}
            </div>
        </div>
    )
}

type Props = Pick<ComponentProps<"div">, 'children'> & {
    title: string,
    breadCrumbs: Array<BreadCrumb>
}

type BreadCrumb = {
    label: string
    url?: string
}