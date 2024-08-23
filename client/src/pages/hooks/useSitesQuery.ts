import { useHttpQuery } from "@/hooks/useHttpQuery"
import { TSiteResult } from "@/types/TSite"

export const useSitesQuery = (data?: any) => {
    return useHttpQuery<TSiteResult>({
        controllerURl: "site/getAll",
        queryKey: ['site_data'],
        options: {
            suspense: true
        },
        data
    })
}