/**
 * Order Model
 * 
 * Represents a complete order placed by a customer.
 * Contains customer information (name, email), order total,
 * and a list of items included in the order.
 */
import {OrderItem} from "./order-item"
export class Order {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public total: number,
        public order_items: OrderItem[]
    ) {}
}