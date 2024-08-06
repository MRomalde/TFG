import { Account } from './account';
import { Commission } from './commission';

export class AccountCommission{
    accountsHasCommissionsId!: number;
    accountId:number;
    account!: Account;
    commissionId:number;
    commission!: Commission;

    public constructor(accountId:number,commissionId:number){
        this.accountId=accountId;
        this.commissionId=commissionId;
    }
}