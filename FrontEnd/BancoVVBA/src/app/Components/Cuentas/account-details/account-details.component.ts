import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../Services/Account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../Modelos/account';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class AccountDetailsComponent implements OnInit {

  account!:Account[];
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
    constructor(private fb: FormBuilder, private accService:AccountService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,) { }

    formModel=this.fb.group({
      Balance:['',[Validators.required,Validators.min(0),Validators.max(999999999)]],
      Iban:['',[Validators.required]],
    });


  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.formModel.get('Iban')?.disable();
    this.GetAccountById();
  }

  GetAccountById(){
    var accountId=+(this.route.snapshot.paramMap.get('id') ?? 0);
    this.accService.GetAccountById(accountId).subscribe(res=>{
      this.account=res;
    });
  }

  Save(){
    this.account[0].user.typeAccess= new UsersTypeAccess(0,"papa");
    this.accService.UpdateAccount(this.account[0]).subscribe(()=>{
      this.toastr.success("Cuenta editada con exito","Editar cuenta");
      this.router.navigate(["/account/accounts"]);
    });
  }
}
