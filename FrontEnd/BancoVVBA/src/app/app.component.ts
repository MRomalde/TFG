// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule  } from '@angular/router';
import { NavBarComponent } from './Components/NavBar/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NavBarComponent
  ]
})
export class AppComponent {
  title = 'BancoVVBA';
}
