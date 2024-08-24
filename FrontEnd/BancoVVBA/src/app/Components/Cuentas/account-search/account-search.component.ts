import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from '../../../Modelos/account';
import { AccountService } from '../../../Services/Account/account.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class AccountSearchComponent implements OnInit {
  accountList$!:Observable<Account[]>;
  private searchTerms= new Subject<string>();
  constructor(private accService:AccountService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.accountList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.accService.searchAccounts(term)),
    );
  }

}
