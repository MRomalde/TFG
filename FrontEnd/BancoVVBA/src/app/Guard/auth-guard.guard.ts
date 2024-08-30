import { CanActivateFn, Router } from '@angular/router';
import { User } from '../Modelos/user';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  var storedUser = localStorage.getItem("currentUser");
  var currentUser: User = storedUser ? JSON.parse(storedUser) : null;
  const router = inject(Router); // Inyecta Router

  if(currentUser!=null || currentUser!=undefined){
    return true;
  }else{
    router.navigate(["/user/login"]);
    return false;
  }
  return true;
};
