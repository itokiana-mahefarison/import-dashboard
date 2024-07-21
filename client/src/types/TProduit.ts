export type TProduit = {
    id?: string
    label?: string
    class?: string
}

export type TProduitResult = {
    total?: number
    data?: Array<TProduit>
}