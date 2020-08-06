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

const phoneBook: PhoneRecord[] = [];

@Injectable({providedIn: 'root'})
export class CreateRecordNotifierService {

  constructor() { }


fetchRecords(): Observable < PhoneRecord[] > {
  console.log(phoneBook);
  return of(phoneBook);
  }

addRecord(phoneRecord: PhoneRecord): void  {
  console.log(phoneBook);
  phoneBook.push(phoneRecord);
  }

}
