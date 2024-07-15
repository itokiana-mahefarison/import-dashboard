import { useMutation } from "react-query"

export const useHttpMutation = (props: Props) => {
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
        }
    )
}

type Props = {
    controllerUrl: string,
    method?: string,
}