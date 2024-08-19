import { TPrixProduit } from "./TPrixProduit"

export type TProduit = {
    id?: string
    label?: string
    class?: string
    prix?: Array<TPrixProduit>
}

export type TProduitResult = {
    total?: number
    data?: Array<TProduit>
}