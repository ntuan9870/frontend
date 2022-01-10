import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DTService {

  constructor(private datePipe: DatePipe) { }

  public getCurrentDateTime(){
    let d = new Date();
    return this.datePipe.transform(d,"yyyy-MM-dd")
  }

  public getNextDateTime(){
    let d = new Date();
    d.setDate(d.getDate()+1);
    return this.datePipe.transform(d,"yyyy-MM-dd")
  }
}
