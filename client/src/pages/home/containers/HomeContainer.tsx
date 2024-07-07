import { ContentLayout } from "@/pages/components/ContentLayout"

const HomeContainer = () => {
    return (
        <ContentLayout 
            title="Dashboard" 
            breadCrumbs={[
                {
                    label: 'Home'
                },
                {
                    label: 'Dashboard',
                    url: '/'
                }
            ]}
        >
            <div>Hello World</div>
        </ContentLayout>
    )
}

export default HomeContainer