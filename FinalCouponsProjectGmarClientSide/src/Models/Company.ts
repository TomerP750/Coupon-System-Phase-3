import {User} from "./User";

export class Company extends User{
    name: string

    constructor(id:number,email:string,password:string,name:string) {
        super(id ,email, password)
        this.name = name;
    }
}