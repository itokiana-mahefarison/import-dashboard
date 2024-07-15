import { useHttpMutation } from "@/hooks/useHttpMutation"

export const useCreateSiteMutation = () => {
    return useHttpMutation({
        controllerUrl: "site/insert",
        method: "POST"
    })
}