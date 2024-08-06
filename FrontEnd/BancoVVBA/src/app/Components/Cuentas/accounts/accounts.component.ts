import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Modelos/account';
import { AccountService } from 'src/app/Services/Account/account.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountList:Account[];
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  constructor(private accService:AccountService,private router:Router) { }
  p:number=1;
  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAllAccounts();
  }
  GetAllAccounts(){
    this.accService.GetAllAccounts().subscribe(res=>this.accountList=res);
  }

}
