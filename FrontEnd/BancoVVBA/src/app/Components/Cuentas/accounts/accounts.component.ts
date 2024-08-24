import { Component, OnInit } from '@angular/core';
import { Account } from '../../../Modelos/account';
import { AccountService } from '../../../Services/Account/account.service';
import { Router } from '@angular/router';
import { User } from '../../../Modelos/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountSearchComponent } from '../account-search/account-search.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AccountSearchComponent]

})
export class AccountsComponent implements OnInit {

  accountList!: Account[];
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
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
