export interface Details {
    productId: number,
    productName: string,
    quantity: number
}

export interface Order {
    name: string,
    shippingAddess: string,
    city: string,
    pickup: boolean,
    id: number
}

export interface detailsOrder {
    details: Details[],
    orderId: number,
    id?: number
}