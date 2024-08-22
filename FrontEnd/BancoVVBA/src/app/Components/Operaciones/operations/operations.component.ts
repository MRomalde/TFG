import { Component, OnInit } from '@angular/core';
import { Account } from '../../../Modelos/account';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OperationService } from '../../../Services/Operation/operation.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../Services/Account/account.service';
import { Operation } from '../../../Modelos/operation';
import { User } from '../../../Modelos/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]

})
export class OperationsComponent implements OnInit {

  accountSelected:string="0";
  accounts!:Account[];
  operations!:Operation[];
  accountId!:number;
  p:number=1;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  nameOfExcelFile:string="Nuevo";
  constructor(private operService:OperationService,private toastr:ToastrService,
    private fb:FormBuilder,private accService:AccountService,private router:Router) { }

    formModel=this.fb.group({
      selectAccounts:['Todos']
    });


  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetAllAccountsToLoadSelect();
    
    
  }

   GetAllAccountsToLoadSelect(){
   this.accService.GetAllAccounts().subscribe(res=>{
     this.accounts=res;
     this.GetOpersByAccountId();
  });
  }

  GetOpersByAccountId(){
    if(this.formModel.value.selectAccounts=="Todos"){
      this.operService.GetAllOperations().subscribe(res=>{
        this.operations=res;
      });
    }
    else{
      this.accountId=Number(this.formModel.value.selectAccounts);
      this.operService.GetOperationsByAccountId(this.accountId).subscribe(res=>{
        this.operations=res;
      });
    }
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
