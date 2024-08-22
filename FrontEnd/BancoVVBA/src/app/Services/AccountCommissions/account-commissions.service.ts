import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountCommission } from '../../Modelos/accountCommission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AccountCommissionsService {

  Uri="https://localhost:7264/api/AccountCommissions";
  constructor(private http: HttpClient) { }

  //get all the AccountCommissions
  GetAllAccountCommissions():Observable<any>{
    return this.http.get(this.Uri + "/getAllAccountCommissions").pipe(catchError(this.handleError<any>('GetAllAccountCommissions',[])));
  }
  //get the AccountCommissions by his id
  GetAccountCommissionsById(accountCommissionsId:number):Observable<any>{
    return this.http.get(this.Uri + "/getAccountCommissionsById/" + accountCommissionsId).pipe(catchError(this.handleError<any>('GetAllAccountCommissions',[])));
  }
  //get the AccountCommissions by his accountId
  GetAccountCommissionsByAccountId(accountId:number):Observable<any>{
    return this.http.get(this.Uri + "/getAccountCommissionsByAccountId/" + accountId).pipe(catchError(this.handleError<any>('GetAllAccountCommissions',[])));
  }
  //get the AccountCommissions by his accountId
  AccountCommissionAlreadyTaken(accountId:number,commissionId:number):Observable<any>{
  return this.http.get(this.Uri + "/accountCommissionAlreadyTaken/" + accountId + "&"+ commissionId).pipe(catchError(this.handleError<any>('GetAllAccountCommissions',[])));
  }
  
  //Create the AccountCommissions
  CreateAccountCommissions(accountCommission:AccountCommission):Observable<any>{
    console.log(accountCommission);
    return this.http.post(this.Uri + "/createAccountCommissions",accountCommission, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })}).pipe(catchError(this.handleError<any>('GetAllAccountCommissions',[])));
  }
  //Create the AccountCommissions
  DeleteAccountCommissions(accountCommissionId:number):Observable<any>{
    return this.http.delete(this.Uri + "/deleteAccountCommissions/" + accountCommissionId).pipe(catchError(this.handleError<any>('GetAllAccountCommissions',[])));
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
