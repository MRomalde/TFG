import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../../Modelos/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]

})
export class NavBarComponent implements OnInit, OnDestroy {
  title="Banco VVBA";
  userIsLogged:boolean=false;
  userRol!:string;
  user!:User;
  counter!:number;
  navigationSubscription;
  constructor(private router:Router) 
    {
      // subscribe to the router events - storing the subscription so
      // we can unsubscribe later. 
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
    }


  ngOnInit() {
    this.CheckIfUserIsLogged();
  }
  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }
  Logout(){
    localStorage.removeItem("currentUser");
    this.router.navigate(["/user/login"]);
  }

  CheckIfUserIsLogged(){
    if(localStorage.getItem("currentUser")==null)
      this.userIsLogged=false;
    else{
      this.userIsLogged=true;
      console.log(localStorage.getItem("currentUser")!)
      this.user=JSON.parse(localStorage.getItem("currentUser")!);
    
    }
  }

}
