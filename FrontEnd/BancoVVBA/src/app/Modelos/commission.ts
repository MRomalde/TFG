export class Commission{
    commissionId!: number;
    description:string;
    price:number;

    public constructor(description:string,price:number){
        this.description=description;
        this.price=price;
    }
}