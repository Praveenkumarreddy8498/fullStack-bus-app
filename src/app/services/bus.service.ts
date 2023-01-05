import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService implements OnInit {

  private _BaseUrl = `http://localhost:9000/bus-api-cud`;
  private _BaseUrlRetrive = `http://localhost:9000/bus-api-retrive`;

  constructor(private _httpclient:HttpClient) {

  }
  ngOnInit(): void {
  }



getCount=():Observable<number>=>{
    return this._httpclient.get<number>(this._BaseUrlRetrive.concat("/count"))
}
getBusDataBySort=(column:string,sort:string,pageNum:number,numItemsPerPage:number):Observable<Bus[]>=>{
   return this._httpclient.get<Bus[]>(this._BaseUrlRetrive+`/${column}/${sort}/${pageNum}/${numItemsPerPage}`)
 }
addBus=(bus:Bus)=>{
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  const requestOptions: Object = {
    headers: headers,
    responseType: 'text'
  }
  return this._httpclient.post<string>(this._BaseUrl,bus,requestOptions)
}

deleteById=(id:number)=>{
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  const requestOptions: Object = {
    headers: headers,
    responseType: 'text'
  }
  return this._httpclient.delete<string>(this._BaseUrl+`/${id}`,requestOptions)
  
}
updateBus=(bus:Bus)=>{
  const headers = new HttpHeaders({      'Content-type': 'application/json',
})
  const requestOptions: Object = {
    headers: headers,
    responseType: 'text'
  }
  return this._httpclient.put<string>(this._BaseUrl,bus,requestOptions)
}

getBusById=(id:number):Observable<Bus>=>{
  return this._httpclient.get<Bus>(this._BaseUrlRetrive+"/"+id)
}

}