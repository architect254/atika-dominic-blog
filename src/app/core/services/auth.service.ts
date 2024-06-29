import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { APIService } from './api.service';

import { User } from '@models/user';
import { STORAGE_KEYS } from '@models/constants';
import { SignInPayload, SignUpPayload, JwtPayload } from '@models/auth.payload';

import { AuthDialogComponent } from '@shared/components/auth-dialog/auth-dialog.component';
import { StorageService } from './storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}`;

  accessToken =
    this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ??
    this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject(
    this.accessToken
  );
  public token$: Observable<any> = this.tokenSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(
    protected override _http: HttpClient,
    protected override snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private storage: StorageService
  ) {
    super(_http, snackBar);
  }

  public get user$(): Observable<User | null> {
    return this.token$.pipe(
      map((token) => {
        if (token) {
          const payload: JwtPayload = jwtDecode(token);
          return payload.user;
        }
        return null;
      })
    );
  }

  public isAuthenticated(): Observable<boolean> {
    return this.token$.pipe(
      map((token) => {
        return !this.jwtHelper.isTokenExpired(token);
      })
    );
  }

  signUp(
    payload: SignUpPayload,
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}/sign-up`;
    this.$subscriptions$.add(
      this._http.post(endpoint, payload, this.httpOptions).subscribe(
        (res) => {
          onSuccess(res);
        },
        (error) => {
          onError(error);
        }
      )
    );
  }

  signIn(
    payload: SignInPayload,
    onSuccess: (response: any) => void,
    onError: (error: Error) => void
  ) {
    const endpoint = `${this.endpoint}/sign-in`;
    this.$subscriptions$.add(
      this._http
        .post<{ accessToken: string }>(endpoint, payload, this.httpOptions)
        .pipe(
          tap({
            next: ({ accessToken }) => {
              this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
              this.tokenSubject.next(accessToken);
            },
          })
        )
        .subscribe({
          next: (res) => {
            onSuccess(res);
          },
          error: (error) => {
            onError(error);
          },
        })
    );
  }
  signOut() {
    this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.tokenSubject.next(null);
  }

  resetPassword(payload: any) {
    return this._http.post<any>(`${this.endpoint}/reset-password`, payload);
  }

  openDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '450px',
    });
  }
}
