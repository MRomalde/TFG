import { User } from './user';
export class Account{
    accountId!: number;
    balance!: number;
    iban!: string;
    userId!: number;
    user!: User;
    constructor(){};
}