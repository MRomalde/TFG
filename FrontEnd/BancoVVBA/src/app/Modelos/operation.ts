import { Account } from './account';

export class Operation{
    operationId!: number;
    date:Date;
    concept:string;
    message:string;
    amount:number;
    accountId:number;
    account!: Account;

    public constructor(operationId:number,date:Date,concept:string,message:string,amount:number,accountId:number, account:Account){
        this.operationId=operationId;
        this.date=date;
        this.concept=concept;
        this.message=message;
        this.amount=amount;
        this.accountId=accountId;
        this.account=account;
    }

}