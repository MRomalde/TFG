import { UsersTypeAccess } from './usersTypeAccess';
export class User{
    userId!: number;
    surnameName:string;
    alias:string;
    login:string;
    password:string;
    dni:string;
    telephone:string;
    mail:string
    typeAccessId:number;
    typeAccess!: UsersTypeAccess;


    public constructor(surnameName:string,alias:string,login:string,password:string,
        dni:string,telephone:string,mail:string,typeAccesId:number)
    {
        this.surnameName=surnameName;
        this.alias=alias;
        this.login=login;
        this.password=password;
        this.dni=dni;
        this.telephone=telephone;
        this.mail=mail;
        this.typeAccessId=typeAccesId;
    }
}

