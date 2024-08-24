import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../../Modelos/account';
import { OperationService } from '../../../Services/Operation/operation.service';
import { AccountService } from '../../../Services/Account/account.service';
import { Operation } from '../../../Modelos/operation';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class OperationCreateComponent implements OnInit {

  maxAmountToCreateOperation!:number;
  accounts!:Account[];
  acc!:Account;
  accountAux!:Account;
  operationToAdd!:Operation;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  constructor(private fb: FormBuilder, private operService:OperationService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService) { }

    formModel=this.fb.group({
      SelectConcepto:['Elige un concepto',[Validators.required]],
      SelectAccounts:['Elige una cuenta',[Validators.required]],
      Date:['',[Validators.required]],
      Amount:['',],
      Message:['',],
    });
  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.accService.GetAllAccounts().subscribe(res => {
      this.accounts = res;
    });
    // Set up the subscription to valueChanges once in ngOnInit
    this.formModel.get('SelectAccounts')?.valueChanges.subscribe(() => {
      this.GetMaxAmountOfTheOperation();
    });
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
  this.accService.GetAccountById(Number(this.formModel.get('SelectAccounts')?.value)).subscribe(res=>{
    res[0].user.typeAccess = new UsersTypeAccess(0,"pa");
    //create the operation to add
    this.operationToAdd = new Operation(
      0,
      new Date(this.formModel.value.Date ?? new Date()),
      this.formModel.value.SelectConcepto ?? '',
      this.formModel.value.Message ?? '',
      Number(this.formModel.value.Amount) ?? 0,
      Number(this.formModel.get('SelectAccounts')?.value) ?? 0,
      res[0]
    );
    
    this.operService.CreateOperation(this.operationToAdd).subscribe(res=>{
      this.formModel.reset();
      this.toastr.success("Operacion creada con exito","Operacion creada");
      this.router.navigate(["/operation/operations"])
    });
  });
  }
  EnableSelectAccounts(){
    //this take element with that id and ser his disabled atribute a true
    const selectElement = document.getElementById("selectAcc") as HTMLSelectElement;
    selectElement.disabled = false;
    //here we charge the select of accounts
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;
    });
    this.GetMaxAmountOfTheOperation();  
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
    let selectedAccountId = Number(this.formModel.get('SelectAccounts')?.value);
    if (!isNaN(selectedAccountId)) {
      this.accService.GetAccountById(selectedAccountId).subscribe(res=>{
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
    }else {
      console.error("Invalid account ID");
    }
    }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

