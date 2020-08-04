import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChildren} from '@angular/core';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {fromEvent, Observable} from 'rxjs';

import {CreateRecordNotifierService, PhoneRecord} from '../service/create-record-notifier.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.css'],
  providers: [CreateRecordNotifierService]
})
export class CreateRecordComponent implements OnInit,  AfterViewInit {


  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];
  constructor(private  createRecordNotifierService: CreateRecordNotifierService,
              private  dialogRef: MatDialogRef<CreateRecordComponent>,
              @Inject(MAT_DIALOG_DATA) public newID: number, ){
  }

  form: FormGroup;

  ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      fname: new FormControl('' ),
      sname: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      notes: new FormControl('')
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
    const newId = Object.values(this.newID);
    const newRecord: PhoneRecord = {
      id: newId[0], email: this.form.get('email').value,
      firstName: this.form.get('fname').value,
      secondName: this.form.get('sname').value,
      phone: this.form.get('phone').value,
      notes: this.form.get('notes').value,
    };
    this.createRecordNotifierService.addRecord(newRecord);
    this.dialogRef.close(newRecord);
  }
}
