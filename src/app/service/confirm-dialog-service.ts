import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable()
export class ConfirmDialogService {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options): void{
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {...options}
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed()
      .pipe(
        take(1)
      );
  }
}
