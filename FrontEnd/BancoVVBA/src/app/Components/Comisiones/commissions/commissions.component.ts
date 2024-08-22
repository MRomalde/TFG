import { Component, OnInit } from '@angular/core';
import { Commission } from '../../../Modelos/commission';
import { CommissionService } from '../../../Services/Commission/commission.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../Modelos/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class CommissionsComponent implements OnInit {

  commissions!:Commission[];
  p:number=1;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;

  constructor(private comService:CommissionService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
    this.GetCommissions();
  }

  GetCommissions(){
    this.comService.GetAllCommissions().subscribe(res=>this.commissions=res);
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
        this.DeleteCommission(user);
        Swal.fire(
          '¡Eliminado!',
          'La comision ha sido eliminada.',
          'success'
        )
      }
    });
  }
  DeleteCommission(commission:Commission){
  this.commissions=this.commissions.filter(com=>com!==commission);
  this.comService.DeleteCommission(commission.commissionId).subscribe(res=>this.toastr.info("Comision borrada","Borrado"));
  }
}
