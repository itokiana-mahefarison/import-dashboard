import { useCallback, useMemo } from "react"
import { useQuery, useQueryClient, UseQueryOptions } from "react-query"
import qs from "qs";

export const useHttpQuery = <T = any>(props: Props<T>) => {
    const client = useQueryClient()
    const convertData = useCallback((data?: any) => {
        return qs.stringify(data)
    }, [props])

    const url = useMemo(() => {
        if(props.method === 'GET' || props.method === undefined){
            return `${props.controllerURl}?${convertData(props.data)}`
        }

        return props.controllerURl
    }, [props])

    const data = useMemo(() => {
        if(props.method === undefined || props.method === 'GET'){
            return;
        }

        return props.data
    }, [props])
    
    const query = useQuery<T>(
        [props.queryKey, props.data],
        async () => {
            const result = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
                method: props.method || "GET",
                body: data && JSON.stringify(data)
            })

            return result.json()
        },
        props.options
    )

    const invalidateQuery = useCallback(() => {
        client.invalidateQueries([props.queryKey])
    }, [props.queryKey])

    return {
        ...query,
        invalidateQuery
    }
}

type Props<T> = {
    queryKey: any,
    controllerURl: string
    data?: any
    method?: "GET" | "POST" | "PUT" | "DELETE"
    options?: Partial<Omit<UseQueryOptions<T>, "queryKey" | "queryFn">>
}