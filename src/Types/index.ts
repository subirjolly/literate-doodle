export type UUID = string

export type Price = number
export type Customer = UUID

export interface Transaction {
    customer: Customer
    id: UUID
    value: Price
}

export interface Column {
    id: string
    title: string
}

export interface CellValue {
    column: string
    value: string | number
}


export interface CustomerReward {
    customer: Customer
    transactions: number
    rewards: number
    expenditure: Price
}
export interface CustomerRewardsMap {
    [key: string]: CustomerReward
}