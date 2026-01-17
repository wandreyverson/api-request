
export interface OrdersItem {
    product: string;
    quantity: number;
    price: number;
}

export interface CreateOrdersDto {
    client: string;
    items: OrdersItem[];
}

export interface UpdateStatusDto {
    status: string;
}
