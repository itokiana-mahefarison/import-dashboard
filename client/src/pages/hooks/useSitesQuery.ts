import { useHttpQuery } from "@/hooks/useHttpQuery"

export const useSitesQuery = () => {
    return useHttpQuery({
        controllerURl: "site/getAll",
        queryKey: ['site-data'],
        options: {
            suspense: true
        }
    })
}