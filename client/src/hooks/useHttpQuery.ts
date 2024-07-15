import { useCallback } from "react"
import { useQuery, useQueryClient, UseQueryOptions } from "react-query"

export const useHttpQuery = (props: Props) => {
    const client = useQueryClient()
    const query = useQuery<any>(
        props.queryKey,
        async () => {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/${props.controllerURl}`, {
                method: props.method || "GET",
                body: props.data && JSON.stringify(props.data)
            })

            return result.json()
        },
        props.options
    )

    const invalidateQuery = useCallback(() => {
        client.invalidateQueries(props.queryKey)
    }, [props.queryKey])

    return {
        ...query,
        invalidateQuery
    }
}

type Props = {
    queryKey: any,
    controllerURl: string
    data?: any
    method?: string
    options?: Partial<Omit<UseQueryOptions, "queryKey" | "queryFn">>
}