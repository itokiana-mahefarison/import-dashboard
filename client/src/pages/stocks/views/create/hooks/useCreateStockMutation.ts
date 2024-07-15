import { useHttpMutation } from "@/hooks/useHttpMutation"

export const useCreateStockMutation = () => {
    return useHttpMutation({
        controllerUrl: "entrystock/insert",
        method: "POST"
    })
}