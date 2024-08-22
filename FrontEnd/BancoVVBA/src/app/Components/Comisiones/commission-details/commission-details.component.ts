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
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule]
})
export class CommissionDetailsComponent implements OnInit {

  commission!:Commission[];
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
    this.GetCurrentCommission();
  }

  GetCurrentCommission(){
    var commissionId = +(this.route.snapshot.paramMap.get("id") ?? 0);
    this.comService.GetCommissionById(commissionId).subscribe(res=>{
      //its a list because is Async
      this.commission=res;
    });
  }
  Save(){
    this.comService.UpdateCommission(this.commission[0]).subscribe(res=>{
      this.toastr.success("Comision editada con exito","Editar Comision");
      this.router.navigate(["/commission/commissions"]);
    });
  }

}
