import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {CreateRecordNotifierService, PhoneRecord} from '../service/create-record-notifier.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fromEvent, Observable} from 'rxjs';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.css']
})
export class EditRecordComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  constructor(private  createRecordNotifierService: CreateRecordNotifierService,
              private  dialogRef: MatDialogRef<EditRecordComponent>,
              @Inject(MAT_DIALOG_DATA) public record: PhoneRecord, ){
  }

  form: FormGroup;

  ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      fname: new FormControl(this.record['phoneRecord'].firstName ),
      sname: new FormControl(this.record['phoneRecord'].secondName),
      phone: new FormControl(this.record['phoneRecord'].phone, [Validators.required]),
      email: new FormControl(this.record['phoneRecord'].email, [Validators.email, Validators.required]),
      notes: new FormControl(this.record['phoneRecord'].notes),
      id: new FormControl(this.record['phoneRecord'].id)
    });

    this.form.valueChanges.subscribe((form: any) => {

      if (form.fname === '' && form.sname === '') {
        this.form.setErrors({ invalid: true});
      }
      else {
        this.form.setErrors(null);
      }
    });
  }

  submit(): void {
    const newRecord: PhoneRecord = {
      id: this.form?.get('id')?.value, email: this.form?.get('email')?.value,
      firstName: this.form?.get('fname')?.value,
      secondName: this.form?.get('sname')?.value,
      phone: this.form?.get('phone')?.value,
      notes: this.form?.get('notes')?.value,
    };
    this.dialogRef.close(newRecord);
  }

}
