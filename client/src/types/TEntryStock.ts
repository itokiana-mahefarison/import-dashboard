import { TProduit } from "./TProduit"
import { TSite } from "./TSite"

export type TEntryStock = {
    id?: string
    entryDate?: string
    produit?: TProduit
    poidsBrutKg?: number
    tareKg?: number
    poidsNetKg?: number
    observation?: string
    comments?: string
    site?: TSite
}

export type TEntryStockResult = {
    total?: number,
    data?: Array<TEntryStock>
}