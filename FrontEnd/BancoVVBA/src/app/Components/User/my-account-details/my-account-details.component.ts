import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../Modelos/operation';
import { Account } from '../../../Modelos/account';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { OperationService } from '../../../Services/Operation/operation.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AccountService } from '../../../Services/Account/account.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account-details',
  templateUrl: './my-account-details.component.html',
  styleUrls: ['./my-account-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class MyAccountDetailsComponent implements OnInit {

  maxAmountToCreateOperation!:number;
  currentOperation!:Operation[];
  acc!:Account;
  accounts!:Account[];
  date!:string;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  
  constructor(
    private fb: FormBuilder, private operService:OperationService,private router:Router,
      private toastr:ToastrService,private route: ActivatedRoute,private accService:AccountService,
      private datePipe: DatePipe) { }

      formModel=this.fb.group({
        SelectConcepto:['',[Validators.required]],
        Date:['',[Validators.required]],
        Amount:['',[Validators.required]],
        Message:['',],
      });
      
  ngOnInit() {
    this.setupValueChangesSubscription();
    this.GetCurrentOperation();
  }

  setupValueChangesSubscription() {
    this.formModel.valueChanges.subscribe(() => {
      // Ensure this runs only when necessary
      if (this.formModel.dirty) {
        this.updateAmountValidators();
      }
    });
  }

  updateAmountValidators() {
    const selectConcept = this.formModel.value.SelectConcepto;
    if (this.maxAmountToCreateOperation !== undefined) {
      this.formModel.controls.Amount.setValidators([
        Validators.required,
        Validators.max(this.maxAmountToCreateOperation),
        Validators.min(0.1)
      ]);
      this.formModel.controls.Amount.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
  }

  GetCurrentOperation() {
    let operIdString = this.route.snapshot.paramMap.get("id");
    if (operIdString !== null) {
      const operId = +operIdString;
      this.operService.GetOperationByOperId(operId).subscribe(res => {
        this.currentOperation = res;
        this.date = this.datePipe.transform(this.currentOperation[0].date, "yyyy-MM-dd") || '';
        this.GetMaxAmountOfTheOperationFirst();
      });
    } else {
      console.error("ID parameter is null");
    }
  }

  UpdateOperation() {
    let dateValue = this.formModel.value.Date;
    if (dateValue) {
      this.currentOperation[0].date = new Date(dateValue);
      this.currentOperation[0].account.user.typeAccess = new UsersTypeAccess(0,"pa");
      this.operService.UpdateOperation(this.currentOperation[0]).subscribe(() => {
        this.toastr.success("Operacion editada con exito", "Editar operacion");
        this.router.navigate(["/user/myAccount"]);
      });
    }
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
      this.updateAmountValidators();
    });
  }

  //first the form is empty so to have the validations we need to look at the 
  //account id that is the same of the select, and if the select change we call
  //the other method
  GetMaxAmountOfTheOperationFirst(){
    this.accService.GetAccountById(this.currentOperation[0].accountId).subscribe(res=>{
      this.acc=res[0];
      if(this.formModel.value.SelectConcepto=="Entrada"){
        this.maxAmountToCreateOperation=999999999-this.acc.balance;
      }
      else{
        this.maxAmountToCreateOperation=this.acc.balance;
      }
      this.updateAmountValidators();
    });
  }

}
