import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthDialogComponent } from '@shared/components/auth-dialog/auth-dialog.component';

@Injectable({ providedIn: 'root' })
export class AppService {
  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AuthDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
