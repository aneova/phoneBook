import {Injectable} from '@angular/core';
import {Observable, of, pipe} from 'rxjs';


export interface PhoneRecord {
  id: number;
  firstName: string;
  secondName: string;
  phone: string;
  email: string;
  notes: string;
}


@Injectable({providedIn: 'root'})
export class CreateRecordNotifierService {

  public phoneBook: PhoneRecord[] = [];

  constructor() { }


fetchRecords(): Observable < PhoneRecord[] > {
    return of(this.phoneBook);
  }

addRecord(phoneRecord: PhoneRecord): void  {
    this.phoneBook.push(phoneRecord);
  }

}
