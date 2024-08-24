import { Component, OnInit } from '@angular/core';
import { Operation } from '../../../Modelos/operation';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from '../../../Services/Operation/operation.service';
import { AccountService } from '../../../Services/Account/account.service';
import { Account } from '../../../Modelos/account';
import { DatePipe } from '@angular/common';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-operation-details',
  templateUrl: './operation-details.component.html',
  styleUrls: ['./operation-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class OperationDetailsComponent implements OnInit {

  maxAmountToCreateOperation!: number;
  currentOperation!: Operation[];
  acc!: Account;
  accounts!: Account[];
  date!: string;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;

  constructor(
    private fb: FormBuilder,
    private operService: OperationService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private accService: AccountService,
    private datePipe: DatePipe
  ) { }

  formModel = this.fb.group({
    SelectConcepto: ['', [Validators.required]],
    SelectAccounts: ['', [Validators.required]],
    Date: ['', [Validators.required]],
    Amount: [''],
    Message: [''],
  });

  ngOnInit() {
    if (this.currentUser.typeAccessId === 2) {
      this.router.navigate(["/user/myAccount"]);
    }
    this.accService.GetAllAccounts().subscribe(res => {
      this.accounts = res;
    });
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

  UpdateOperation() {
    let dateValue = this.formModel.value.Date;
    if (dateValue) {
      this.currentOperation[0].date = new Date(dateValue);
      this.currentOperation[0].account.user.typeAccess = new UsersTypeAccess(0,"pa");
      this.operService.UpdateOperation(this.currentOperation[0]).subscribe(() => {
        this.toastr.success("Operacion editada con exito", "Editar operacion");
        this.router.navigate(["/operation/operations"]);
      });
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

  EnableSelectAccounts() {
    this.accService.GetAllAccounts().subscribe(res => {
      this.accounts = res;
    });
    if (this.formModel.value.SelectAccounts !== 'Elige una cuenta') {
      this.GetMaxAmountOfTheOperation();
    }
  }

  GetMaxAmountOfTheOperation() {
    const selectAccountId = this.formModel.value.SelectAccounts;
    if (selectAccountId) {
      const accountId = Number(selectAccountId);
      if (!isNaN(accountId)) {
        this.accService.GetAccountById(accountId).subscribe(res => {
          this.acc = res[0];
          this.maxAmountToCreateOperation = this.formModel.value.SelectConcepto === "Entrada" ?
            999999999 - this.acc.balance :
            this.acc.balance;
          this.updateAmountValidators();
        });
      }
    }
  }

  GetMaxAmountOfTheOperationFirst() {
    this.accService.GetAccountById(this.currentOperation[0].accountId).subscribe(res => {
      this.acc = res[0];
      this.maxAmountToCreateOperation = this.formModel.value.SelectConcepto === "Entrada" ?
        999999999 - this.acc.balance :
        this.acc.balance;
      this.updateAmountValidators();
    });
  }
}
