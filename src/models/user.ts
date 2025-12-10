import {Role} from './role'

export class User {
    constructor(
        public id = 0,
        public email = '',
        public first_name = '',
        public last_name = '',
        public role = new Role()
    ) {}

    get name(){
        return this.first_name + ' ' + this.last_name;
    }
}