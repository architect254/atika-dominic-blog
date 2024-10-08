import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Data,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '@core/services/auth.service';
import { filter, map, Observable, Subscription } from 'rxjs';
import { User } from '@models/user';
import { FooterComponent } from '../footer/footer.component';

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
    FooterComponent,
    AsyncPipe,
    CommonModule,
  ],
  providers: [AsyncPipe],
})
export class LayoutComponent implements OnInit, OnDestroy {
  pageHeading!: string;
  action!: any;

  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<User | null>;

  $subscriptions$: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getAuthDetails();
  }
  getAuthDetails() {
    this.user$ = this.route.data.pipe(map((data) => data[`user`]));
    this.isAuthenticated$ = this.route.data.pipe(
      map((data) => data[`isAuthenticated`])
    );
  }

  ngOnInit(): void {
    this.getPageTitleAndAction();
    this.$subscriptions$.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.getPageTitleAndAction();
        })
    );
  }

  getPageTitleAndAction() {
    if (!this.route.firstChild?.firstChild) {
      this.pageHeading = ``;
      this.action = null;
    } else if (!this.route.firstChild.firstChild.firstChild) {
      this.$subscriptions$.add(
        this.route.firstChild?.firstChild?.data.subscribe((data: Data) => {
          this.action = data[`action`] ?? ``;
          this.pageHeading = this.route.firstChild?.firstChild?.snapshot
            .routeConfig?.title as string;
        })
      );
    } else {
      this.$subscriptions$.add(
        this.route.firstChild?.firstChild?.firstChild?.data.subscribe(
          (data: Data) => {
            this.action = data[`action`] ?? ``;
            this.pageHeading = this.route.firstChild?.firstChild?.snapshot
              .routeConfig?.title as string;
          }
        )
      );
    }
  }

  act() {}

  goToAuthorConfig() {
    this.router.navigate(['set-author-details']);
  }

  login() {
    this.authService.openDialog();
  }

  logOut() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.$subscriptions$.unsubscribe();
  }
}
