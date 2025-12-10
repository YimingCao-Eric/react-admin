/**
 * User Model
 * 
 * Represents a user in the system.
 * Contains user identification, contact information, and role assignment.
 * Provides a computed property to get the full name.
 */
import {Role} from './role'

export class User {
    constructor(
        public id = 0,
        public email = '',
        public first_name = '',
        public last_name = '',
        public role = new Role()
    ) {}

    /**
     * Returns the full name of the user by combining first and last name
     */
    get name(){
        return this.first_name + ' ' + this.last_name;
    }
}