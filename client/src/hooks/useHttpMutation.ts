import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "react-query"

export const useHttpMutation = (props: Props) => {
    const { toast } = useToast()

    return useMutation(
        async (data: any) => {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/${props.controllerUrl}`, {
                method: props.method || 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            return result.json()
        },
        {
            onError: () => {
                toast({
                    title: "Erreur",
                    description: "Une erreur s'est produite",
                    variant: "destructive"
                })
            }
        }
    )
}

type Props = {
    controllerUrl: string,
    method?: string,
}