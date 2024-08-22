import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommissionService } from '../../../Services/Commission/commission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commission } from '../../../Modelos/commission';
import { User } from '../../../Modelos/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-commission-create',
  templateUrl: './commission-create.component.html',
  styleUrls: ['./commission-create.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class CommissionCreateComponent implements OnInit {

  CommissionToCreate!:Commission;
  storedUser = localStorage.getItem("currentUser");
  currentUser: User = this.storedUser ? JSON.parse(this.storedUser) : null;
  constructor(private fb: FormBuilder, private comService:CommissionService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute) { }

    formModel=this.fb.group({
      Description:['',[Validators.required]],
      Price:['',[Validators.required,Validators.min(0.1),Validators.max(100)]],
    });

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
  }

  CreateCommission(){
    this.CommissionToCreate = new Commission(
      this.formModel.value.Description ?? '', // Si es undefined o null, se usa una cadena vacía
      Number(this.formModel.value.Price) ?? 0 // Si es undefined o null, se usa un 0
    );
    //call to the service to create commission
    this.comService.CreateCommission(this.CommissionToCreate).subscribe((res:any)=>{
      this.formModel.reset();
      this.toastr.success("Nueva comision creada","Creada con exito");
      this.router.navigate(["/commission/commissions"]);
    },
    err=>{console.log(err)});
  
  }

}
