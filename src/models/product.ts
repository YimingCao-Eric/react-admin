/**
 * Product Model
 * 
 * Represents a product in the system.
 * Contains product information including title, description,
 * image URL, and price.
 */
export class Product {
    constructor(
        public id = 0,
        public title= '',
        public description= '',
        public image= '',
        public price = 0,
    ) { }
}