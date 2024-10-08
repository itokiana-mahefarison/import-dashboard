import { useHttpQuery } from "@/hooks/useHttpQuery"

export const useProductsQuery = () => {
    return useHttpQuery({
        controllerURl: "produit/getAll",
        queryKey: ['produit_data'],
        options: {
            suspense: true
        }
    })
}