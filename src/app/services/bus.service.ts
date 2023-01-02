import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService implements OnInit {
 
  private _BaseUrl = `http://localhost:9000/bus-api-cud/bus`;
  private _BaseUrlRetrive = `http://localhost:9000/bus-api-retrive/bus`;

  constructor(private _httpclient:HttpClient) {

  }
  ngOnInit(): void {
  }



getCount=():Observable<number>=>{
    return this._httpclient.get<number>(this._BaseUrlRetrive.concat("/count"))
}
getBusDataBySort=(column:string,sort:string,pageNum:number,numItemsPerPage:number):Observable<Bus[]>=>{
   return this._httpclient.get<Bus[]>(this._BaseUrlRetrive+`/sort/${column}/${sort}/${pageNum}/${numItemsPerPage}`)
 }
addBus=(bus:Bus)=>{
  return this._httpclient.post<void>(this._BaseUrl,bus)
}
deleteById=(id:number)=>{
  return this._httpclient.delete<void>(this._BaseUrl+`/${id}`)
  
}
updateBus=(bus:Bus)=>{
  return this._httpclient.put<void>(this._BaseUrl,bus)
}

getBusById=(id:number):Observable<Bus>=>{
  return this._httpclient.get<Bus>(this._BaseUrlRetrive+"/"+id)
}

}