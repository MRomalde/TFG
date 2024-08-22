import { User } from './user';
export class Account{
    accountId!: number;
    balance!: number;
    iban!: string;
    userId!: number;
    user!: User;
    constructor(accountId:number, balance:number, iban:string, userId:number, user:User){
        this.accountId=accountId;
        this.balance=balance;
        this.iban=iban;
        this.userId=userId;
        this.user=user;
    };
}