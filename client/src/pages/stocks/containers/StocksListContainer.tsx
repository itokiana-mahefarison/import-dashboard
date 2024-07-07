import { ContentLayout } from "@/pages/components/ContentLayout"

const StocksListContainer = () => {
    return (
        <ContentLayout 
            title="Stocks" 
            breadCrumbs={
                [
                    {
                        label: 'Acueil',
                        url: '/'
                    },
                    {
                        label: "Stocks"
                    }
                ]
            }
        >
            <div>Stock list</div>
        </ContentLayout>
    )
}

export default StocksListContainer