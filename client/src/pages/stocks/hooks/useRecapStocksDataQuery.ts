import { useHttpQuery } from "@/hooks/useHttpQuery"

export const useRecapStocksDataQuery = () => {
    return useHttpQuery({
        queryKey: ["recap-stock"],
        controllerURl: 'recap',
        options: {
            suspense: true
        }
    })
}