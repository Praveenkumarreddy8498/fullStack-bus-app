import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private _BaseUrl = `http://localhost:8081/bus-api/bus`;

  constructor(private _httpclient:HttpClient) {

  }
  // getCount=():void=>{
  //   return this._httpclient.get()
  // }
 getBusData=():Observable<Bus[]>=>{
   return this._httpclient.get<Bus[]>(this._BaseUrl+`/sort/${1}/${3}`)
 }
addBus=(bus:Bus)=>{
  return this._httpclient.post<void>(this._BaseUrl,bus)
}


getBusById=(id:number):Observable<Bus>=>{
  return this._httpclient.get<Bus>(this._BaseUrl+"/"+id)
}

}