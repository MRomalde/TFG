import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../../Services/Operation/operation.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../Services/Account/account.service';
import { User } from '../../../Modelos/user';
import { Operation } from '../../../Modelos/operation';
import { Account } from '../../../Modelos/account';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class MyAccountComponent implements OnInit {

  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  operations!:Operation[];
  account!:Account[];

  constructor(private operService:OperationService,private toastr:ToastrService,
    private accService:AccountService,private router:Router) { }

  ngOnInit() {
    this.GetAllOperationsByUserId();
  }
  GetAllOperationsByUserId() {
    console.log(this.currentUser);
    this.accService.GetAccountByUserId(this.currentUser.userId).subscribe(res=>{
    this.account=res;
    
    //call the api inside this subscribe to use the account
    this.operService.GetOperationsByAccountId(this.account[0].accountId).subscribe(res=>{
      this.operations=res;
    });
    });
  }

  confirmDelete(user: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.DeleteOper(user);
        Swal.fire(
          '¡Eliminado!',
          'La operacion ha sido eliminada.',
          'success'
        )
      }
    });
  }
  DeleteOper(oper:Operation){
    this.operations=this.operations.filter(o=>o!==oper);
    this.operService.DeleteOper(oper.operationId).subscribe(res=>this.toastr.info("Operacion borrada","Borrar"));
  }
}
