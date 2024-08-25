import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../Modelos/user';
import { UserService } from '../../../Services/User/user.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class SearchComponent implements OnInit {

  userList$!:Observable<User[]>;
  private searchTerms= new Subject<string>();
  constructor(private userService:UserService) { }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.userList$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }
  
}
