import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

import { APIService } from './api.service';

import { User } from '@models/user';
import { STORAGE_KEYS } from '@models/constants';
import { SignInPayload, SignUpPayload, JwtPayload } from '@models/auth';

import { AuthDialogComponent } from '@shared/components/auth-dialog/auth-dialog.component';
import { StorageService } from './storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends APIService {
  protected override endpoint: string = `${this.BASE_URL}`;

  private jwtHelper = new JwtHelperService();

  accessToken = this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? ``;

  private $token: BehaviorSubject<any> = new BehaviorSubject(this.accessToken);

  constructor(
    private readonly dialog: MatDialog,
    private storage: StorageService
  ) {
    super();
  }

  get token$(): Observable<any> {
    return this.$token.asObservable();
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.token$.pipe(
      map((token) => {
        return !this.jwtHelper.isTokenExpired(token);
      })
    );
  }

  get user$(): Observable<User | null> {
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

  signUp(
    payload: SignUpPayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/sign-up`;
    return this._http.post(endpoint, payload, this.httpOptions).subscribe(
      (res) => {
        onSuccess?.(res);
      },
      (error) => {
        onError?.(error);
      }
    );
  }

  signIn(
    payload: SignInPayload,
    onError?: (error: Error) => void,
    onSuccess?: (response: any) => void
  ) {
    const endpoint = `${this.endpoint}/sign-in`;
    return this._http
      .post<{ accessToken: string }>(endpoint, payload, this.httpOptions)
      .pipe(
        tap({
          next: ({ accessToken }) => {
            this.$token.next(accessToken);
            this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          },
        })
      )
      .subscribe({
        next: (res) => {
          onSuccess?.(res);
        },
        error: (error) => {
          onError?.(error);
        },
      });
  }
  signOut() {
    this.$token.next(null);
    this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
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
