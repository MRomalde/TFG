import { Component, OnInit } from '@angular/core';
import { AccountCommissionsService } from '../../../Services/AccountCommissions/account-commissions.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../Services/Account/account.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountCommission } from '../../../Modelos/accountCommission';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../Modelos/user';
import { Account } from '../../../Modelos/account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-commissions',
  templateUrl: './account-commissions.component.html',
  styleUrls: ['./account-commissions.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class AccountCommissionsComponent implements OnInit {

  accounts!:Account[];
  accountCommissions!:AccountCommission[];
  accountId!:number;
  p:number=1;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  constructor(private accComService:AccountCommissionsService,private toastr:ToastrService,
    private fb:FormBuilder,private accService:AccountService,private router:Router) { }

    formModel=this.fb.group({
      selectAccounts:['Todos']
    });

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAllAccountsToLoadSelect();
  }

  GetAllAccountsToLoadSelect(){
    this.accService.GetAllAccounts().subscribe(res=>{
      this.accounts=res;
      this.GetAccountCommissionsByAccountId();
   });
   }

   GetAccountCommissionsByAccountId(){
    if(this.formModel.value.selectAccounts=="Todos"){
      this.accComService.GetAllAccountCommissions().subscribe(res=>{
        this.accountCommissions=res;
      });
    }
    else{
      this.accountId=Number(this.formModel.value.selectAccounts);
      this.accComService.GetAccountCommissionsByAccountId(this.accountId).subscribe(res=>{
        this.accountCommissions=res;
      });
    }
  }

  DeleteAccountCommission(accCom:AccountCommission){
    this.accountCommissions=this.accountCommissions.filter(o=>o!==accCom);
    this.accComService.DeleteAccountCommissions(accCom.accountsHasCommissionsId).subscribe(res=>this.toastr.info("Operacion borrada","Borrar"));
  }
}
