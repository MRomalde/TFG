import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/User/user.service';
import { User } from '../../../Modelos/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]

})
export class UsersComponent implements OnInit {

  userList!: User[];
  numberOfAdmins!:Number;
  userToDelete!:User;
  p:number=1;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  constructor(private userService:UserService,private toastr:ToastrService,private route:Router) { }

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.route.navigate(["/user/myAccount"]);
    }
    this.GetUsers();
  }

  GetUsers(){
    this.userService.GetAllUsers().subscribe(Users=>{
      this.userList=Users;
    });
    
  }
  DeleteUser(user:User){
    
    this.userService.GetUserById(user.userId).subscribe(res=>{
    this.userToDelete=JSON.parse(localStorage.getItem("currentUser")!);
      if(user.typeAccessId==1){
        if(user.userId==this.userToDelete.userId)
          this.toastr.error("No se puede borrar a uno mismo","Borrado incompleto");
        else{
          this.userList=this.userList.filter(u=>u!==user);
          this.userService.DeleteUser(user.userId).subscribe(res=>this.toastr.info("Usuario borrado","Borrado"));
        }
    }
    else{
      this.userList=this.userList.filter(u=>u!==user);
      this.userService.DeleteUser(user.userId).subscribe(res=>this.toastr.info("Usuario borrado","Borrado"));
    }
    })
  }

}
