import {Component, OnChanges, OnInit} from '@angular/core';
import {CreateRecordComponent} from './create-record/create-record.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateRecordNotifierService, PhoneRecord} from './service/create-record-notifier.service';
import {EditRecordComponent} from './edit-record/edit-record.component';
import {ConfirmDialogService} from './service/confirm-dialog-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CreateRecordNotifierService, ConfirmDialogService]
})



export class AppComponent implements OnInit {
  constructor( private dialog: MatDialog,
               private createRecordNotifierService: CreateRecordNotifierService,
               private confirmDialogService: ConfirmDialogService) {
  }

  title = 'phoneBook';
  public phoneBook: PhoneRecord[] = [];
  newID = this.phoneBook.length;

  ngOnInit(): void {
    this.createRecordNotifierService.fetchRecords()
      .pipe()
      .subscribe(res =>
        this.phoneBook = res
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRecordComponent, {
        width: '30rem',
        autoFocus: true,
        closeOnNavigation: false,
        data: {newID: this.newID}
      });

    dialogRef.afterClosed().subscribe(
      data => {
          this.phoneBook.push(data);
          this.newID = this.phoneBook.length;
      }
    );
  }

  editRecord(id: number): void {
    const dialogRef = this.dialog.open(EditRecordComponent, {
      width: '30rem',
      autoFocus: true,
      closeOnNavigation: false,
      data: {phoneRecord: this.phoneBook[id]}
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data)
        {
          this.phoneBook.filter(el => {
            if (el.id === id)
            {
              el.firstName = data?.firstName;
              el.secondName = data?.secondName;
              el.phone = data?.phone;
              el.email = data?.email;
              el.notes = data?.notes;
            }
          });
        }

      }
    );
  }

  deleteRecord(id: number): void {
    const options = {
      title: 'Are you sure you want to delete this Phone Book Record ?',
      message: 'By deleting you will permanently lose your data!',
      cancelText: 'CANCEL',
      confirmText: 'YES, DELETE'
    };

    this.confirmDialogService.open(options);
    this.confirmDialogService.confirmed().subscribe(
      res => {
        if (res) { this.phoneBook = this.phoneBook.filter(t => t.id !== id); }
      }
    );
  }
}
