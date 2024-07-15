import { useHttpQuery } from "@/hooks/useHttpQuery"

export const useProductsQuery = () => {
    return useHttpQuery({
        controllerURl: "produit/getAll",
        queryKey: ['produit-data'],
        options: {
            suspense: true
        }
    })
}