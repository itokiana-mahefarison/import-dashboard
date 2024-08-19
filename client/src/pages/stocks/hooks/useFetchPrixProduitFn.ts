import { useCallback } from "react"
import qs from "qs"
import { TPrixProduitResult } from "@/types/TPrixProduit"
import moment from "moment"

export const useFetchPrixProduitFn = (productId?: string, period?: string) => {

    return useCallback(async (prix?: string): Promise<TPrixProduitResult> => {
        if(prix){
            return {
                total: 0,
                data: []
            }
        }

        const queryString = qs.stringify({
            filter: {
               produit: {
                id: productId
               },
               createdAt_inf: moment(period).add(1, "day").toISOString()
            },
            pageSize: 1
        })

        const result = await fetch(`${import.meta.env.VITE_API_URL}/prixproduit/getAll?${queryString}`, {
            method: "GET",
        })

        return result.json()
    }, [productId])
}