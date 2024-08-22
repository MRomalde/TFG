import { Component, OnInit } from '@angular/core';
import { Commission } from '../../../Modelos/commission';
import { Account } from '../../../Modelos/account';
import { FormBuilder, Validators, FormGroup, AsyncValidatorFn, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountCommissionsService } from '../../../Services/AccountCommissions/account-commissions.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../Services/Account/account.service';
import { CommissionService } from '../../../Services/Commission/commission.service';
import { AccountCommission } from '../../../Modelos/accountCommission';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-commissions-create',
  templateUrl: './account-commissions-create.component.html',
  styleUrls: ['./account-commissions-create.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,ReactiveFormsModule]
})
export class AccountCommissionsCreateComponent implements OnInit {
  accountCommission!: AccountCommission;
  accounts!: Account[];
  commissions!: Commission[];
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;

  formModel: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accComService: AccountCommissionsService,
    private router: Router,
    private toastr: ToastrService,
    private accService: AccountService,
    private comService: CommissionService
  ) {
    this.formModel = this.fb.group({
      SelectAccounts: ['Elige una cuenta', Validators.required],
      SelectCommissions: ['Elige una comision', Validators.required],
    }, { asyncValidators: [this.commissionAlreadyTakenValidator()] });
  }

  ngOnInit() {
    if (this.currentUser.typeAccessId == 2) {
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAllAccountsAndCommissions();
  }

  GetAllAccountsAndCommissions() {
    this.accService.GetAllAccounts().subscribe(res => {
      this.accounts = res;
    });
    this.comService.GetAllCommissions().subscribe(res => {
      this.commissions = res;
    });
  }

  CreateAccountCommission() {
    this.accountCommission= new AccountCommission(0,Number(this.formModel.value.SelectAccounts),new Account(0,0,"",0,this.currentUser),Number(this.formModel.value.SelectCommissions),new Commission("pa",0))

    this.accService.GetAccountById(this.formModel.value.SelectAccounts).subscribe(res=> {
      this.accountCommission.account= new Account(0,res[0].balance,res[0].iban,res[0].userId, res[0].user);
      this.accountCommission.account.user.typeAccess= new UsersTypeAccess(0,"Cual sea");
    })
    this.comService.GetCommissionById(this.formModel.value.SelectCommissions).subscribe(res=> {
      this.accountCommission.commission=res[0];
    })
    console.log(this.accountCommission);
    this.accComService.CreateAccountCommissions(this.accountCommission).subscribe(res => {
      this.formModel.reset();
      this.toastr.success("Operacion creada con exito", "Operacion creada");
      this.router.navigate(["/accountCommission/accountCommissions"]);
    });
  }

  EnableSelectCommission() {
    const select = document.getElementById("selectCom") as HTMLSelectElement;
    if (select) {
      select.disabled = false;
    }
  }

  commissionAlreadyTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      const formGroup = control.parent as FormGroup;
      const commissionControl = formGroup?.get('SelectCommissions');
      const accountControl = formGroup?.get('SelectAccounts');
  
      if (commissionControl && accountControl && commissionControl.value && accountControl.value) {
        return this.accComService.AccountCommissionAlreadyTaken(accountControl.value, commissionControl.value).pipe(
          map(data => data ? { commissionExist: true } : null),
          catchError(() => of(null))
        );
      }
      return of(null);
    };
  }
}
