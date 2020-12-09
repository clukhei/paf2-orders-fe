export interface Orders {
    id: number, 
    order_date: Date,
    customer_id : number, 
    total_quantity: number,
    total_unit_price: number,
    total_discount: number,
    cost_price: number
}