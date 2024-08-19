import { TProduit } from "./TProduit"

export type TPrixProduit = {
    id?: number
    prix?: number
    createdAt?: string
    produit?: TProduit
}

export type TPrixProduitResult = {
    total?: number
    data?: Array<TPrixProduit>
}