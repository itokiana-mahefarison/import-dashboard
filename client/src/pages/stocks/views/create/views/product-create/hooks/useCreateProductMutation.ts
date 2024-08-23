import { useHttpMutation } from "@/hooks/useHttpMutation"

export const useCreateProductMutation = () => {
    return useHttpMutation({
        controllerUrl: "produit/insert",
        method: "POST"
    })
}