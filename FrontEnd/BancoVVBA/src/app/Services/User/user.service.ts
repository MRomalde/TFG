import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../../Modelos/user';
import { LoginModel } from '../../Modelos/loginModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  Uri="https://localhost:7264/api/user";
  constructor(private http: HttpClient) { }
  //get all users
  GetAllUsers():Observable<any>{
    return this.http.get(this.Uri + "/getAllUsers").pipe(catchError(this.handleError<any>('GetAllUsers',[])));
  }
  //find user by id
  GetUserById(userId:number):Observable<any>{
    return this.http.get(this.Uri + "/findUserById/" + userId).pipe(catchError(this.handleError<any>('getUserById',[])));
  }
  //find user by id
  GetUserByMail(mail:string):Observable<any>{
    return this.http.get(this.Uri + "/findUserByMail/" + mail).pipe(catchError(this.handleError<any>('getUserById',[])));
  }

  //Update user
  UpdateUser(user:User):Observable<any>{
    return this.http.put(this.Uri + "/updateUser/" + user.userId,user).pipe(catchError(this.handleError<any>('getUserById',[])));
  }
  //search users
  searchUsers(search:string):Observable<any>{
    if(!search.trim()){
      return of([]);
    }
    return this.http.get(this.Uri + "/name/" + search).pipe(catchError(this.handleError<any>('Search',[])));
  }

  //Delete user
  DeleteUser(userId:number):Observable<any>{
    return this.http.delete(this.Uri + "/delete/"+ userId).pipe(catchError(this.handleError<any>('Delete',[])));
  }

  //Password recovery
  PasswordRecovery(mail:string):Observable<any>{
    return this.http.get(this.Uri+ "/passwordRecovery/" + mail).pipe(catchError(this.handleError<any>('register',[])));
  }
  //Register
  CreateUserFromRegister(user:User):Observable<any>{
    return this.http.post(this.Uri+ "/register",user,httpOptions).pipe(catchError(this.handleError<any>('register',[])));
  }
  //Login
  Login(loginModel:LoginModel):Observable<any>{
    return this.http.post(this.Uri + "/login",loginModel,httpOptions).pipe(catchError(this.handleError<any>('login',[])));
  }

  //Count the number of admins
  LookIfUserAreYou(user:User){
    return this.http.get(this.Uri + "/lookIfUserAreYou/"+user.userId).pipe(catchError(this.handleError<any>('numberOfAdmins',[])));
  }
  //get all user type access
  GetAllUserTypeAccess():Observable<any>{
    return this.http.get(this.Uri + "/getAllUserTypeAccess").pipe(catchError(this.handleError<any>('getAllUserTypeAccess',[])));
  }

  //Server Validators
  DniExistInDb(dni:string):Observable<any>{
    return this.http.get(this.Uri + "/checkIfDniExistInDb/"+ dni).pipe(catchError(this.handleError<any>('dniExist',[])));
  }
  LoginExistInDb(login:string):Observable<any>{
    return this.http.get(this.Uri + "/checkIfLoginExistInDb/"+ login).pipe(catchError(this.handleError<any>('loginExist',[])));
  }
  EmailExistInDb(email:string):Observable<any>{
    return this.http.get(this.Uri + "/checkIfEmailExistInDb/"+ email).pipe(catchError(this.handleError<any>('emailExist',[])));
  }
  AliasExistInDb(alias:string):Observable<any>{
    return this.http.get(this.Uri+ "/CheckIfAliasExistInDb/"+ alias,{responseType:'text'}).pipe(catchError(this.handleError<any>('AliasExist',[])));
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
