import { Bean, Blocks, LayoutGrid, Upload } from "lucide-react"

export const useMainMenus = (): Array<GroupMenu> => {
    return [
        {
            menus: [
                {
                    href: '/dashboard',
                    label: "Dashboard",
                    icon: LayoutGrid,
                }
            ]
        },
        {
            groupLabel: "Stocks",
            menus: [
                {
                    href: '/stocks',
                    label: 'Recapitulation de stock',
                    icon: Blocks
                },
                {
                    href: '/stocks/import',
                    label: 'Importer un fichier stock',
                    icon: Upload
                }
            ]
        },
        {
            groupLabel: "Produits",
            menus: [
                {
                    href: '/products',
                    label: 'Liste des produits',
                    icon: Bean
                }
            ]
        },
    ]
}

export type GroupMenu = {
    groupLabel?: string
    menus?: Array<Menu>
}

export type Menu = {
    href: string
    label: string
    active?: boolean
    icon?: any
    subMenus?: Array<Menu>
}