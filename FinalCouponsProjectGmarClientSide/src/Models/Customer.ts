import {User} from "./User";

export class Customer extends User{
    firstName:string
    lastName:string

    constructor(id:number ,firstName:string, lastName:string, email:string, password:string) {
        super(id, email, password)
        this.firstName = firstName;
        this.lastName = lastName;
    }
}