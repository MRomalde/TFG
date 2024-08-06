import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/Modelos/loginModel';
import { User } from 'src/app/Modelos/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel:LoginModel;
  userLogin:User[];
  refresh:string;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router,
    private toastr:ToastrService) { }

    formLogin=this.fb.group({
      UserName:['',Validators.required],
      Password:['',Validators.required]
    });

  ngOnInit() {
    if(this.currentUser!=null||this.currentUser!=undefined){
      if(this.currentUser.typeAccessId==1){
        this.router.navigate(["/user/users"]);
      }else{
        this.router.navigate(["/user/myAccount"]);
      }
    }
    this.formLogin.reset();  
  }
  Login(){
    this.loginModel=new LoginModel(this.formLogin.value.UserName,this.formLogin.value.Password);
    this.userService.Login(this.loginModel).subscribe(res=>{      
      this.userLogin=res;
      if(this.userLogin==undefined){
        this.toastr.error("Username y/o contraseña incorrectos","Error de inicio de sesion");
        this.formLogin.reset();
      }
      else{
      //localstorage only contains strings so we have to parse the response to string and
      //to recover it we need to parse it other time to an object
      localStorage.setItem('currentUser',JSON.stringify(this.userLogin[0]));
      localStorage.setItem("refresh","0");
      switch(this.userLogin[0].typeAccessId){
        case 1:
          this.router.navigate(["/user/users"]);
        break;
        case 2:
          this.router.navigate(["/user/myAccount"]);
        break;
        case 3:
         this.toastr.info("Usuario deshabilitado, por favor contacte con un administrador","Usuario Deshabilitado");
         this.formLogin.reset();
        break;
        default:
            this.formLogin.reset();            
      }  
    }
    },
    err=>{
      console.log(err.value);
    });
  }

}
