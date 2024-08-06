import { Account } from './account';

export class Operation{
    operationId!: number;
    date:Date;
    concept:string;
    message:string;
    amount:number;
    accountId:number;
    account!: Account;

    public constructor(date:Date,concept:string,message:string,amount:number,accountId:number){
        this.date=date;
        this.concept=concept;
        this.message=message;
        this.amount=amount;
        this.accountId=accountId;
    }

}