// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ]
})
export class AppComponent {
  title = 'BancoVVBA';
}
