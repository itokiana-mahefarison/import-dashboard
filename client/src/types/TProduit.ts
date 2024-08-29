import { TEntryStock } from "./TEntryStock"
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

export type TProductStats = {
    totalStock: number
    totalAmount: number
    allPrices: Array<TPrixProduit>
    stockBySite: Array<StockBySite>
    lastEntries: Array<TEntryStock>
}

type StockBySite = {
    stock: number,
    site: string
}