import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/pages/components/ContentLayout"
import { Suspense, useCallback } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ImportRecapTable } from "../components/ImportRecapTable"
import { PageContentLoader } from "@/pages/components/PageContentLoader"

const StocksListContainer = () => {
    const navigate = useNavigate()
    const handleCreateEntryStock = useCallback(() => {
        navigate('create')
    }, [])

    return (
        <>
            <ContentLayout 
                title="Récapitulation de stocks" 
                breadCrumbs={
                    [
                        {
                            label: 'Accueil',
                            url: '/'
                        },
                        {
                            label: "Récapitulation de stocks"
                        }
                    ]
                }
            >
                <div className="grid gap-5">
                    <div className="flex justify-end">
                        <Button onClick={handleCreateEntryStock}>
                            Ajouter une nouvelle entrée de stocks
                        </Button>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <Suspense fallback={<PageContentLoader/>}>
                            <ImportRecapTable/>
                        </Suspense>
                    </div>
                </div>
            </ContentLayout>
            <Outlet/>
        </>
    )
}

export default StocksListContainer