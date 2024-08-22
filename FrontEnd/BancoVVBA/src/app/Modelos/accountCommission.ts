import { Account } from './account';
import { Commission } from './commission';

export class AccountCommission{
    accountsHasCommissionsId!: number;
    accountId:number;
    account!: Account;
    commissionId:number;
    commission!: Commission;

    public constructor(accountsHasCommissionsId:number, accountId:number, account: Account, commissionId:number, commission:Commission){
        this.accountsHasCommissionsId= accountsHasCommissionsId;
        this.accountId=accountId;
        this.account=account;
        this.commissionId=commissionId;
        this.commission=commission;
    }
}