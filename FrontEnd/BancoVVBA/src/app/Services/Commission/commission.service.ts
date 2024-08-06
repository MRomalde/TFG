import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Commission } from '../../Modelos/commission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  

  Uri="https://localhost:7264/api/commission";
  constructor(private http: HttpClient) { }

  //get all the commissions
  GetAllCommissions():Observable<any> {
    return this.http.get(this.Uri + "/getAllCommissions").pipe(catchError(this.handleError<any>('GetAllCommissions',[])));
  }
  GetCommissionById(commissionId:number):Observable<any> {
    return this.http.get(this.Uri + "/getCommissionById/" + commissionId).pipe(catchError(this.handleError<any>('GetAllCommissions',[])));
  }
  CreateCommission(commission:Commission):Observable<any> {
    return this.http.post(this.Uri + "/createCommission",commission).pipe(catchError(this.handleError<any>('GetAllCommissions',[])));
  }
  UpdateCommission(commission:Commission):Observable<any> {
    return this.http.put(this.Uri + "/updateCommission/" + commission.commissionId,commission).pipe(catchError(this.handleError<any>('GetAllCommissions',[])));
  }
  DeleteCommission(commissionId:number):Observable<any> {
    return this.http.delete(this.Uri + "/deleteCommission/" + commissionId).pipe(catchError(this.handleError<any>('GetAllCommissions',[])));
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
