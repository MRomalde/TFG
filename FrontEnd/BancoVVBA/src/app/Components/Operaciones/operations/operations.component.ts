import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/Modelos/account';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationService } from 'src/app/Services/Operation/operation.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/Services/Account/account.service';
import { Operation } from 'src/app/Modelos/operation';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { User } from 'src/app/Modelos/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  accountSelected:string="0";
  accounts:Account[];
  operations:Operation[];
  accountId:number;
  p:number=1;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
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
      this.accountId=this.formModel.value.selectAccounts;
      this.operService.GetOperationsByAccountId(this.accountId).subscribe(res=>{
        this.operations=res;
      });
    }
  }
  
  DeleteOper(oper:Operation){
    this.operations=this.operations.filter(o=>o!==oper);
    this.operService.DeleteOper(oper.operationId).subscribe(res=>this.toastr.info("Operacion borrada","Borrar"));
  }

  public ExportToExcel(){

    let workbook = new Workbook();
   
    let worksheet = workbook.addWorksheet('Operaciones');
    
   
    let titleRow = worksheet.addRow('Todas las operaciones');
   
    titleRow.font = { name: 'Arial', family: 4, size: 16, bold: true }
   
    worksheet.addRow([]);
    
   
    let header = ["Nombre de usuario", "Fecha", "Mensaje" , "Concepto","Cantidad"]
   
    //Add Header Row
   
    let headerRow = worksheet.addRow(header);
   
    
   
    // Cell Style : Fill and Border
   
    headerRow.eachCell((cell, number) => {
   
    cell.fill = {
   
    type: 'pattern',
   
    pattern: 'solid',
   
    fgColor: { argb: 'FFEEEEEE' },
   
    bgColor: { argb: '110000' }
   
    }
   
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
   
    })
    
   
    this.operations.forEach(d => {
   
    worksheet.addRow([d.account.user.surnameName,new Date(d.date), d.message, d.concept,d.amount]);
   
    });
    worksheet.getColumn(1).width = 35;
    worksheet.getColumn(2).width = 12;  
    worksheet.getColumn(3).width = 50;  
    worksheet.getColumn(4).width = 12;
    worksheet.getColumn(5).width = 15;

    
   
    workbook.xlsx.writeBuffer().then((data) => {
   
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
   
    fs.saveAs(blob, 'BancoVVBA_Operaciones_'+ this.nameOfExcelFile+'.xlsx');
   
    })
   
    }

}
