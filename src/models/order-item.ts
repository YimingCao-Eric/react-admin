/**
 * OrderItem Model
 * 
 * Represents an individual item within an order.
 * Contains information about a specific product that was ordered,
 * including its title, price, and quantity.
 */
export class OrderItem {
    constructor(
        public id: number,
        public product_title: string,
        public price: number,
        public quantity: number,
    ) {}
}