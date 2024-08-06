import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Operation } from '../../Modelos/operation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class OperationService {

  Uri="https://localhost:7264/api/operation";
  constructor(private http: HttpClient) { }

  //Get all the operations
  GetAllOperations():Observable<any>{
    return this.http.get(this.Uri + "/getAllOperations").pipe(catchError(this.handleError<any>('GetAllOpers',[])));
  }
  //Get operations filtred by accounts
  GetOperationsByAccountId(accountId:number):Observable<any>{
    return this.http.get(this.Uri + "/getOperationByAccountId/" + accountId).pipe(catchError(this.handleError<any>('GetOpersFiltredById',[])));
  }
  //Create an operation
  CreateOperation(oper:Operation):Observable<any>{
    return this.http.post(this.Uri + "/createOperation",oper).pipe(catchError(this.handleError<any>('CreateOper',[])));
  }
  //Create a transfer
  CreateTrasfer(oper:Operation):Observable<any>{
    return this.http.post(this.Uri + "/createTransfer",oper).pipe(catchError(this.handleError<any>('CreateOper',[])));
  }
  //delete an operation
  DeleteOper(operId:number):Observable<any>{
    return this.http.delete(this.Uri + "/delete/" + operId).pipe(catchError(this.handleError<any>('DeleteOper',[])));
  }
  //get the current Operation
  GetOperationByOperId(operId:number):Observable<any>{
    return this.http.get(this.Uri + "/getOperationById/" + operId).pipe(catchError(this.handleError<any>('GetOperById',[])));
  }

  UpdateOperation(oper:Operation):Observable<any>{
    return this.http.put(this.Uri + "/updateOperation/" + oper.operationId,oper).pipe(catchError(this.handleError<any>('UpdateOper',[])));
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
