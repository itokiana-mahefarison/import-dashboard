export type TSite = {
    id?: string
    name?: string
}

export type TSiteResult = {
    total?: number,
    data?: Array<TSite>
}