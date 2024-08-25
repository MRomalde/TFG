import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../Services/User/user.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UsersTypeAccess } from '../../../Modelos/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class UserDetailsComponent implements OnInit {
  alias!:string;
  aliasExistInDb:boolean=true;
  typeUserSelected:string="0";
  typeUserAccessList!:UsersTypeAccess[];
  user!:User[];
  nameOfUser!:string;
  surnameOfUser!:string;
  dniOfUser!:string;
  mailOfUser!:string;
  loginOfUser!:string;
  userId!:number;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  canChangeUserTypeAccess:Boolean=true;


  constructor(private fb: FormBuilder, private userService:UserService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,) { }

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
    },{validator:this.ComparePasswords}),
    //the number one is a default value
    UserTypeAccess:[1,Validators.required]
    });


  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.canChangeUserTypeAccess==true;
    this.GetAllUserTypeAccess();
    this.GetUserById();
  }
  GetUserById() {
    let userIdAux=this.route.snapshot.paramMap.get("id");
    if(userIdAux !== null){
      this.userId =+ userIdAux;
      this.userService.GetUserById(this.userId).subscribe(userList=>{
        this.user=userList;
        // Asigna los valores al formulario
        this.formModel.patchValue({
          Name: this.user[0].surnameName.split(',')[1],
          Surname: this.user[0].surnameName.split(',')[0],
          Email: this.user[0].mail,  // This should work if the validator is properly set up
          Telephone: String(this.user[0].telephone),
          Dni: this.user[0].dni,      // This should work as well
          UserName: this.user[0].login,
          UserTypeAccess: this.user[0].typeAccessId || 1
        });

        this.dniOfUser=this.user[0].dni;
        this.mailOfUser=this.user[0].mail;
        this.loginOfUser=this.user[0].login;
        this.nameOfUser=this.user[0].surnameName.split(',')[1];
        this.surnameOfUser=this.user[0].surnameName.split(',')[0];
        this.CantChangeUserTypeAccess(this.dniOfUser);
      });
    }else {
      console.error("ID parameter is null");
    }
  }

  GetAllUserTypeAccess(){
    this.userService.GetAllUserTypeAccess().subscribe(res=>this.typeUserAccessList=res);
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

  CantChangeUserTypeAccess(dni:string){
    if(this.currentUser.dni==dni){     
      this.canChangeUserTypeAccess=false;
    }
  }
  DniExistInDb(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      var dniControlValue = control.value;
      this.userService.DniExistInDb(dniControlValue).subscribe(data => {
        if (data && dniControlValue !== this.dniOfUser) {
          resolve({ DniExist: true });
        } else {
          resolve(null);
        }
      });
    });
  }

  LoginExistInDb(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      var loginControlValue = control.value;
      this.userService.LoginExistInDb(loginControlValue).subscribe(data => {
        if (data && loginControlValue !== this.loginOfUser) {
          resolve({ LoginExist: true });
        } else {
          resolve(null);
        }
      });
    });
  }

  EmailExistInDb(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      var emailControlValue = control.value;
      this.userService.EmailExistInDb(emailControlValue).subscribe(data => {
        if (data && emailControlValue !== this.mailOfUser) {
          resolve({ EmailExist: true });
        } else {
          resolve(null);
        }
      });
    });
  }

  Save(){
    this.userService.GetUserById(this.userId).subscribe(userList=>{
      userList[0].typeAccess=new UsersTypeAccess(0,"pa");
      userList[0].dni=this.formModel.value.Dni;
      userList[0].alias=this.formModel.value.Surname!.substring(0,2) + this.formModel.value.Name!.substring(this.formModel.value.Name?.length!-2);
      userList[0].surnameName=this.formModel.value.Surname + "," + this.formModel.value.Name;
      userList[0].mail=this.formModel.value.Email;
      userList[0].telephone=this.formModel.value.Telephone;
      userList[0].login=this.formModel.value.UserName;
      userList[0].password=this.formModel.value.Passwords.Password;
      userList[0].typeAccessId=this.formModel.value.UserTypeAccess;
      //TODO
      this.userService.AliasExistInDb(userList[0].alias).subscribe(data=>{
        userList[0].alias=data;
      });
      console.log(userList[0]);
      //call to the service to update user
      this.userService.UpdateUser(userList[0]).subscribe((res:any)=>{
        //find the user created and then create his account  in the back
        this.formModel.reset();
        this.toastr.success("El usuario ha sido cambiado","Editado con exito");
        this.router.navigate(["/user/users"]);
      },
      err=>{console.log(err)});
    });
  }
}
