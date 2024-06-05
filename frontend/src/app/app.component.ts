//app.component.ts

import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule
  ],
})

export class AppComponent {
  title = 'frontend';

constructor(private router: Router) {}

}
