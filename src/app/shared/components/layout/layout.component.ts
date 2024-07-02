import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@models/user';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
  ],
})
export class LayoutComponent implements OnInit {
  title: string = ``;

  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;
  user$: Observable<User | null> = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  goToAuthorConfig() {
    this.router.navigate(['author-config']);
  }

  login() {
    this.authService.openDialog();
  }

  logOut() {
    this.authService.signOut();
  }
}
