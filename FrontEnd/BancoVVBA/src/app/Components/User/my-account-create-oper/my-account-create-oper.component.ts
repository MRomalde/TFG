import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../Modelos/operation';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationService } from '../../../Services/Operation/operation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../Services/Account/account.service';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { Account } from '../../../Modelos/account';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-account-create-oper',
  templateUrl: './my-account-create-oper.component.html',
  styleUrls: ['./my-account-create-oper.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
  
})
export class MyAccountCreateOperComponent implements OnInit {

  maxAmountToCreateOperation!:number;
  operationToAdd!:Operation;
  acc!:Account;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;


  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService) { }


    formModel=this.fb.group({
      SelectConcepto:['Elige un concepto',[Validators.required]],
      Date:['',[Validators.required]],
      Amount:['',[Validators.required]],
      Message:['',],
    });
    
  ngOnInit() {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.DisableElements();
    });
  }
  DisableElements(){
    // Disable the form control programmatically
    this.formModel.get('SelectAccounts')?.disable();
    let inputsDependOfSelectAccount=document.getElementsByName("DependsOfSelectAccount");
    for (let i = 0; i < inputsDependOfSelectAccount.length; i++) {
      let inputElement = inputsDependOfSelectAccount[i] as HTMLInputElement;
      inputElement.disabled = true;
    }
  }

  CreateOperation(){
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
      res[0].user.typeAccess = new UsersTypeAccess(0,"pa");
      //create the operation to add
      this.operationToAdd = new Operation(
      0,
      new Date(this.formModel.value.Date ?? new Date()),
      this.formModel.value.SelectConcepto ?? '',
      this.formModel.value.Message ?? '',
      Number(this.formModel.value.Amount) ?? 0,
      res[0].accountId,
      res[0]
      );
        
      this.operService.CreateOperation(this.operationToAdd).subscribe(res=>{
        this.formModel.reset();
        this.toastr.success("Operacion creada con exito","Operacion creada");
        this.router.navigate(["/user/myAccount"])
      });
    });  
        
  }

  EnableInputs(){
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
      if(this.formModel.value.SelectConcepto=="Entrada"){
        this.maxAmountToCreateOperation=999999999-this.acc.balance;
      }
      else{
        this.maxAmountToCreateOperation=this.acc.balance;
      }
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
