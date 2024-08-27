import { ContentLayout } from "@/pages/components/ContentLayout"
import { PageContentLoader } from "@/pages/components/PageContentLoader"
import { Suspense } from "react"
import { ProductList } from "../components/ProductList"

const ProductsContainer = () => {
    return (
        <ContentLayout
            title="Liste des produits"
            breadCrumbs={[
                {
                    label: "Accueil",
                    url: '/'
                },
                {
                    label: "Liste des produits"
                }
            ]}
        >
            <Suspense fallback={<PageContentLoader/>}>
                <ProductList/>
            </Suspense>
        </ContentLayout>
    )
}

export default ProductsContainer