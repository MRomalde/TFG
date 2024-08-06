import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from '../../Modelos/account';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  Uri="https://localhost:7264/api/account"
  constructor(private http:HttpClient) { }

  //get all accounts
  GetAllAccounts():Observable<any>{
    return this.http.get(this.Uri + "/getAllAccounts").pipe(catchError(this.handleError<any>('getAllAccounts',[])));
  }
  //get all accounts except yours
  GetAllAccountsExceptYours(accountId:number):Observable<any>{
    return this.http.get(this.Uri + "/getAllAccountsExceptYourAcc/" +accountId).pipe(catchError(this.handleError<any>('getAllAccounts',[])));
  }
  //get account by Id
  GetAccountById(accountId:number):Observable<any>{
    return this.http.get(this.Uri + "/findAccountById/"+ accountId).pipe(catchError(this.handleError<any>('getAccountById',[])));
  }
  //get account by Id
  GetAccountByUserId(userId:number):Observable<any>{
    return this.http.get(this.Uri + "/findAccountByUserId/"+ userId).pipe(catchError(this.handleError<any>('getAccountById',[])));
  }
  //Update account
  UpdateAccount(account:Account):Observable<any>{
    return this.http.put(this.Uri+"/updateAccount/" + account.accountId,account).pipe(catchError(this.handleError<any>('updateAccount',[])));
  }

  //search accounts by name
  searchAccounts(term:string):Observable<any>{
    return this.http.get(this.Uri+ "/name/" + term).pipe(catchError(this.handleError<any>('searchByName',[])));
  }




  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
private log(message: string) {
 console.log(message);
}
}
