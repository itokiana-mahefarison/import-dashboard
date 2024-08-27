import { Button } from "@/components/ui/button"
import { ContentLayout } from "@/pages/components/ContentLayout"
import { Suspense, useCallback } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ImportRecapTable } from "../components/ImportRecapTable"
import { PageContentLoader } from "@/pages/components/PageContentLoader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PeriodSelection } from "../components/PeriodSelection"
import { usePeriodFormData } from "../hooks/usePeriodFormData"
import moment from "moment"
import _ from "lodash"

const StocksListContainer = () => {
    const navigate = useNavigate()
    const handleCreateEntryStock = useCallback(() => {
        navigate('create')
    }, [])

    const {formData, handleInputChange} = usePeriodFormData()

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
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Récapitulation de stocks
                        </CardTitle>
                        <CardDescription>
                            {`${_.upperFirst(moment(formData?.period).format("MMMM"))} - ${moment(formData?.period).format("YYYY")}`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-5">
                            <div className="flex justify-between">
                                <PeriodSelection
                                    period={formData?.period}
                                    onSelectPeriod={(val) => {
                                        handleInputChange("period", val)
                                    }}
                                />
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
                    </CardContent>
                </Card>
            </ContentLayout>
            <Outlet/>
        </>
    )
}

export default StocksListContainer