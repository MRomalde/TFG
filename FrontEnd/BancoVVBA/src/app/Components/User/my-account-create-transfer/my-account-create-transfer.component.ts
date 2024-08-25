import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../Modelos/operation';
import { Account } from '../../../Modelos/account';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationService } from '../../../Services/Operation/operation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../Services/Account/account.service';
import { ToastrService } from 'ngx-toastr';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-my-account-create-transfer',
  templateUrl: './my-account-create-transfer.component.html',
  styleUrls: ['./my-account-create-transfer.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class MyAccountCreateTransferComponent implements OnInit {

  maxAmountToCreateOperation!:number;
  accounts!:Account[];
  acc!:Account;
  operationToAdd!:Operation;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService) { }

    formModel=this.fb.group({
      SelectAccounts:['Elige una cuenta',[Validators.required]],
      Date:['',[Validators.required]],
      Amount:['',[Validators.required]],
      Message:['',],
    });

  ngOnInit() {
    this.GetAllAccountsExceptYours();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.DisableElements();
    });
  }
  DisableElements(){
    let inputsDependOfSelectAccount=document.getElementsByName("DependsOfSelectAccount");
    for (let i = 0; i < inputsDependOfSelectAccount.length; i++) {
      let inputElement = inputsDependOfSelectAccount[i] as HTMLInputElement;
      inputElement.disabled = true;
    }
  }

  CreateTransfer(){
    this.accService.GetAccountById(Number(this.formModel.get('SelectAccounts')?.value) ?? 0).subscribe(res=>{
      res[0].user.typeAccess = new UsersTypeAccess(0,"pa");
      //create the operation to add
      this.operationToAdd = new Operation(
      0,
      new Date(this.formModel.value.Date ?? new Date()),
      "Entrada",
      this.formModel.value.Message ?? '',
      Number(this.formModel.value.Amount) ?? 0,
      res[0].accountId,
      res[0]
      );
    
      this.operService.CreateTrasfer(this.operationToAdd).subscribe(res=>{
        
        }); 
        this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
          res[0].user.typeAccess = new UsersTypeAccess(0,"pa");
          //create the operation to add
          this.operationToAdd = new Operation(
            0,
            new Date(this.formModel.value.Date ?? new Date()),
            "Salida",
            this.formModel.value.Message ?? '',
            Number(this.formModel.value.Amount) ?? 0,
            res[0].accountId,
            res[0]
            );
            
          this.operService.CreateTrasfer(this.operationToAdd).subscribe(res=>{
            this.formModel.reset();
            this.toastr.success("Transferencia creada con exito","Transferencia creada");
            this.router.navigate(["/user/myAccount"])
          }); 
      });
    });
    }

  GetAllAccountsExceptYours(){
    if(this.currentUser==null || this.currentUser==undefined){
      this.router.navigate(["/user/login"]);
    }
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      this.acc=res[0];
      this.accService.GetAllAccountsExceptYours(this.acc.accountId).subscribe(res=>{
        this.accounts=res;
      });
    });
  }

  EnableInputsDependOfSelectAccounts(){
    let inputsDependOfSelectAccount=document.getElementsByName("DependsOfSelectAccount");
    for (let i = 0; i < inputsDependOfSelectAccount.length; i++) {
      let inputElement = inputsDependOfSelectAccount[i] as HTMLInputElement;
      inputElement.disabled = false;
    }
    this.GetMaxAmountOfTheOperation(); 
  }

  GetMaxAmountOfTheOperation(){
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      this.acc=res[0];
      this.maxAmountToCreateOperation=this.acc.balance;
      // Update the Amount control validators with the new max value
      this.formModel.controls.Amount.setValidators([
        Validators.required,
        Validators.max(this.maxAmountToCreateOperation),
        Validators.min(0.1)
      ]);

      // Refresh the validity of the control without triggering an infinite loop
      this.formModel.controls.Amount.updateValueAndValidity({ emitEvent: false });

    });
  }

}
