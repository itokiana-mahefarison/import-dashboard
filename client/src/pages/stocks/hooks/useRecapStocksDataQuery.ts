import { useHttpQuery } from "@/hooks/useHttpQuery"

export const useRecapStocksDataQuery = (period?: string) => {
    return useHttpQuery({
        queryKey: ["recap-stock"],
        controllerURl: 'recap',
        data: {
            period
        },
        options: {
            suspense: true
        }
    })
}