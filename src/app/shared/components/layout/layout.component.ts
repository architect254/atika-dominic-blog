import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    AsyncPipe,
  ],
})
export class LayoutComponent implements OnInit {
  title: string = ``;
  user$: Observable<User | null> = this.authService.user$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.openDialog();
  }
}
