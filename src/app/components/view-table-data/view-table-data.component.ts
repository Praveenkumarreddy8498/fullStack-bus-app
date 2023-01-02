import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table-data.component.html',
  styleUrls: ['./view-table-data.component.css']
})
export class ViewTableDataComponent implements OnInit {
  bus!:Bus;
  busid: number = 0;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _busService: BusService,
    private _location:Location
  ) {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((map) => {
      let bid = map.get('id');
      if (bid) this.busid = parseInt(bid);
    })
    this._busService.getBusById(this.busid).subscribe({
      next:(data: any)=>{
        this.bus=data;
      },
  });
  
}
backClicked(){
  this._location.back();
}
forwardClicked(){
  this._location.forward();

}

}
