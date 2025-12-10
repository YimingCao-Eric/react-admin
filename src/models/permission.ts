/**
 * Permission Model
 * 
 * Represents a permission that can be assigned to roles.
 * Permissions define what actions a role can perform in the system.
 */
export class Permission {
    constructor(
        public id = 0,
        public name = '') { }
}