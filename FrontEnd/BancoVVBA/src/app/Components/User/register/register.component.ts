import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../../../Services/User/user.service';
import { User } from '../../../Modelos/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsersTypeAccess } from '../../../Modelos/usersTypeAccess';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]

})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService:UserService,private router:Router,
    private toastr:ToastrService) { }

  userToRegister!:User;
  surnameName!:string;
  alias!:string;
  aliasExistInDb:boolean=true;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  //it's a list because the back come as a list of an asynchronous operation
  userToCreateAccount!:User[];

  formModel=this.fb.group({
    Name:['',[Validators.required]],
    Surname:['',[Validators.required]],
    Email:['',[Validators.required,Validators.email],[this.EmailExistInDb.bind(this)]],
    Telephone:['',[Validators.required,Validators.min(600000000),Validators.max(799999999)]],
    Dni:['',[Validators.required],[this.DniExistInDb.bind(this)]],
    UserName:['',[Validators.required],[this.LoginExistInDb.bind(this)]],
    Passwords:this.fb.group({
      Password:['',[Validators.required]],
      ConfirmPassword:['',Validators.required]
  },{validator:this.ComparePasswords})
  });

  ngOnInit() {
    if(localStorage.getItem("currentUser")!=null){
      if(this.currentUser.typeAccessId==1){
        this.router.navigate(["/user/users"]);
      }else{
        this.router.navigate(["/user/myAccount"]);
      }
    }
    this.formModel.reset();
  }

  ComparePasswords(fb:FormGroup){
    var confirmPasswordControl=fb.get("ConfirmPassword");
    if(confirmPasswordControl!.errors==null|| 'passwordMismatch' in confirmPasswordControl!.errors){
      if(fb.get("Password")!.value!=confirmPasswordControl!.value)
        confirmPasswordControl!.setErrors({passwordMismatch:true});
      else
        confirmPasswordControl!.setErrors(null);
    }
  }
// DniExistInDb validator
DniExistInDb(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.userService.DniExistInDb(control.value).pipe(
    map(data => (data ? { DniExist: true } : null)),
    catchError(() => of(null))
  );
}

// LoginExistInDb validator
LoginExistInDb(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.userService.LoginExistInDb(control.value).pipe(
    map(data => (data ? { LoginExist: true } : null)),
    catchError(() => of(null))
  );
}

// EmailExistInDb validator
EmailExistInDb(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.userService.EmailExistInDb(control.value).pipe(
    map(data => (data ? { EmailExist: true } : null)),
    catchError(() => of(null))
  );
}

Register() {
  this.surnameName = this.formModel.value.Surname + "," + this.formModel.value.Name;
  this.alias = this.surnameName.substring(0, 2) + this.surnameName.substring(this.surnameName.length - 2);

  this.userService.AliasExistInDb(this.alias).subscribe(data => {
      this.alias = data;
      
      // Asignar los valores del formulario al usuario
      const userName: string = String(this.formModel.value.UserName || '');
      const password: string = String(this.formModel.value.Passwords.Password || '');
      const dni: string = String(this.formModel.value.Dni || '');
      const telephone: string = String(this.formModel.value.Telephone || '');
      const email: string = String(this.formModel.value.Email || '');
      
      // Crear el usuario con el typeAccessId establecido en 3
      this.userToRegister = new User(
          this.surnameName,
          this.alias,
          userName,
          password,
          dni,
          Number(telephone),
          email,
          3 // TypeAccessId establecido en 3
      );
      
      // Llamar al servicio para registrar al usuario
      this.userService.CreateUserFromRegister(this.userToRegister).subscribe({
          next: (res: any) => {
              this.formModel.reset();
              this.toastr.success("Nuevo usuario creado", "Registrado con éxito");
              this.router.navigate(["/user/login"]);
          },
          error: (err: any) => {
              console.log('Register failed:', err);
              if (err.error && err.error.errors) {
                  console.log('Validation errors:', err.error.errors);
              }
          }
      });
  });
}

}


