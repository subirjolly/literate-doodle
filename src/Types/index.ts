export type UUID = string

export type Price = number
export type Customer = UUID

export interface Transaction {
    customer: Customer
    id: UUID
    value: Price
}
