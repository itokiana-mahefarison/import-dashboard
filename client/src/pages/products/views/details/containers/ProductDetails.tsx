import { Tabs } from "@/components/tabs/Tabs"
import { useHttpQuery } from "@/hooks/useHttpQuery"
import { ContentLayout } from "@/pages/components/ContentLayout"
import { TProduit } from "@/types/TProduit"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { BarChart3Icon } from "lucide-react"
import { useEffect, useMemo } from "react"

const ProductDetails = () => {
    const {id} = useParams()
    const location = useLocation()
    const naviate = useNavigate()

    const [, , , TAB] = useMemo(() => location.pathname.split('/'), [location])

    useEffect(() => {
        if(!TAB){
            naviate('stats')
        }
    }, [])

    const { data } = useHttpQuery<TProduit>({
        controllerURl: `produit/getById/${id}`,
        queryKey: ['produit_data', id],
        options: {
            suspense: true
        }
    })

    return (
        <ContentLayout
            title={`Produit - ${data?.label}`}
            breadCrumbs={[
                {
                    label: "Accueil",
                    url: '/',
                },
                {
                    label: "Liste des produits",
                    url: "/products"
                },
                {
                    label: data?.label || "",
                }
            ]}
        >
            <Tabs
                items={[
                    {
                        label: "Statistiques",
                        url: 'stats',
                        icon: <BarChart3Icon className="w-4 h-4" />
                    }
                ]}
                isMenuActive={(item) => {
                    return item.url === TAB
                }}
            />
            <Outlet/>
        </ContentLayout>
    )
}

export default ProductDetails