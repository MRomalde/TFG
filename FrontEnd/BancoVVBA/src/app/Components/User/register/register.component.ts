import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import { User } from 'src/app/Modelos/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService:UserService,private router:Router,
    private toastr:ToastrService) { }

  userToRegister:User;
  surnameName:string;
  alias:string=null;
  aliasExistInDb:boolean=true;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  //it's a list because the back come as a list of an asynchronous operation
  userToCreateAccount:User[];

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
    if(confirmPasswordControl.errors==null|| 'passwordMismatch' in confirmPasswordControl.errors){
      if(fb.get("Password").value!=confirmPasswordControl.value)
        confirmPasswordControl.setErrors({passwordMismatch:true});
      else
        confirmPasswordControl.setErrors(null);
    }
  }

  DniExistInDb(fb:FormGroup){
    return new Promise(res=>{
    var dniControlValue=fb.value;
    this.userService.DniExistInDb(dniControlValue).subscribe(data=>{
      if(data){
        fb.setErrors({DniExist:true});
      }
      else{
        fb.setErrors(null);
      }
    })
  })
  }

  LoginExistInDb(fb:FormGroup){
    return new Promise(res=>{
      var loginControlValue=fb.value;
      this.userService.LoginExistInDb(loginControlValue).subscribe(data=>{
        if(data)
          fb.setErrors({LoginExist:true});
        else
          fb.setErrors(null);
      })

    })
  }

  EmailExistInDb(fb:FormGroup){
    return new Promise(res=>{
      var emailControlValue=fb.value;
      this.userService.EmailExistInDb(emailControlValue).subscribe(data=>{
        if(data)
          fb.setErrors({EmailExist:true});
        else
          fb.setErrors(null);
      })

    })
  }

    Register(){
    this.surnameName=this.formModel.value.Surname +","+this.formModel.value.Name;
    this.alias=this.surnameName.substring(0,2) + this.surnameName.substring(this.surnameName.length-2);
    
    this.userService.AliasExistInDb(this.alias).subscribe(data=>{
      this.alias=data;
    //if you need to use the values of the subscribe, you need to put all your behind code inside it   
    //asign the form values to the user
    this.userToRegister=new User(this.surnameName,this.alias,this.formModel.value.UserName,
    this.formModel.value.Passwords.Password,this.formModel.value.Dni,this.formModel.value.Telephone,
    this.formModel.value.Email,3);
    
    //call to the service to register user
    this.userService.CreateUserFromRegister(this.userToRegister).subscribe((res:any)=>{
      //find the user created and then create his account  in the back
      this.formModel.reset();
      this.toastr.success("Nuevo usuario creado","Registrado con exito");
      this.router.navigate(["/user/login"]);
    },
    err=>{console.log(err)});
  })
  }
}


