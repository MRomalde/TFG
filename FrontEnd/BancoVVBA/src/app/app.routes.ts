import { Routes } from '@angular/router';
import { LoginComponent } from '../app/Components/User/login/login.component';
import { UsersComponent } from '../app/Components/User/users/users.component';
import { AccountsComponent } from '../app/Components/Cuentas/accounts/accounts.component';
import { OperationsComponent } from '../app/Components/Operaciones/operations/operations.component';
import { CommissionsComponent } from '../app/Components/Comisiones/commissions/commissions.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { MyAccountComponent } from './Components/User/my-account/my-account.component';
import { AccountCommissionsComponent } from './Components/CuentasComisiones/account-commissions/account-commissions.component';
import { CommissionDetailsComponent } from './Components/Comisiones/commission-details/commission-details.component';
import { CommissionCreateComponent } from './Components/Comisiones/commission-create/commission-create.component';
import { AccountDetailsComponent } from './Components/Cuentas/account-details/account-details.component';
import { AccountCommissionsCreateComponent } from './Components/CuentasComisiones/account-commissions-create/account-commissions-create.component';
import { OperationDetailsComponent } from './Components/Operaciones/operation-details/operation-details.component';
import { OperationCreateComponent } from './Components/Operaciones/operation-create/operation-create.component';
import { MyAccountDetailsComponent } from './Components/User/my-account-details/my-account-details.component';
import { MyAccountCreateOperComponent } from './Components/User/my-account-create-oper/my-account-create-oper.component';
import { MyAccountCreateTransferComponent } from './Components/User/my-account-create-transfer/my-account-create-transfer.component';
import { UserDetailsComponent } from './Components/User/user-details/user-details.component';
import { UserCreateComponent } from './Components/User/user-create/user-create.component';
import { authGuard } from './Guard/auth-guard.guard';

export const routes: Routes = [
    {path:"user/login", component: LoginComponent},
    {path:"user/register", component: RegisterComponent},
    {path:"user/users" , component: UsersComponent, canActivate: [authGuard]},
    {path:"user/details/:id" , component: UserDetailsComponent, canActivate: [authGuard]},
    {path:"user/create", component:UserCreateComponent, canActivate: [authGuard]},
    {path:"user/myAccount", component:MyAccountComponent, canActivate: [authGuard]},
    {path:"user/myAccount/details/:id", component:MyAccountDetailsComponent, canActivate: [authGuard]},
    {path:"user/myAccount/createOper", component:MyAccountCreateOperComponent, canActivate: [authGuard]},
    {path:"user/myAccount/createTransfer", component:MyAccountCreateTransferComponent, canActivate: [authGuard]},
    {path:"account/accounts", component:AccountsComponent, canActivate: [authGuard]},
    {path:"account/details/:id", component:AccountDetailsComponent, canActivate: [authGuard]},
    {path:"operation/operations", component:OperationsComponent, canActivate: [authGuard]},
    {path:"operation/details/:id", component:OperationDetailsComponent, canActivate: [authGuard]},
    {path:"operation/create", component:OperationCreateComponent, canActivate: [authGuard]},
    {path:"commission/commissions", component:CommissionsComponent, canActivate: [authGuard]},
    {path:"commission/details/:id", component:CommissionDetailsComponent, canActivate: [authGuard]},
    {path:"commission/create", component:CommissionCreateComponent, canActivate: [authGuard]},
    {path:"accountCommission/accountCommissions", component:AccountCommissionsComponent, canActivate: [authGuard]},
    {path:"accountCommission/create", component:AccountCommissionsCreateComponent, canActivate: [authGuard]},
    {path: '', redirectTo: "/user/login", pathMatch: 'full'},
    


];
