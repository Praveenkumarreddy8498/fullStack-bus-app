import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  busList: Bus[] = [];
  bus!: Bus;
  documentCount!: number;
  pageNo:number=1;
  constructor( private _busService:BusService,private _router:Router,private _location: Location) { }

  ngOnInit(): void {
    
    this._busService.getCount().subscribe({
      next: (data) => {
        console.log(data);
        this.documentCount = data;
        this._busService.getBusDataBySort('busId', 'asc', this.pageNo, data).subscribe({
          next: (data) => {
            this.busList = data;
            console.log(this.busList);
           
          },
        });
      },
    });

  }
  backClicked(){
    this._location.back();

  }
  frontClicked(){
    this._location.forward();

  }
  

}
