import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
export interface BusData {
  busId: number;
  busServiceNum: number;
  busPlateNum: string;
  busType: string;
  busServiceType: string;
  busCapacity: number;
  startingPoint: string;
  destination: string;
  busStops: number;
  busDuration: string;
  scheduleDepartureDateTime: Date;
  scheduleArrivalDateTime: Date;
  estimatedArrivalDateTime: Date;
  fareAmount: number;
  fareTax: number;
  totalFare: number;
  flexiTicket: boolean;
  movieEnabled: boolean;
  rating: number;
  runningStatus: boolean;
  // isActive:boolean;
}
@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.css'],
})
export class DataAccessComponent implements OnInit {
  constructor(private _busService: BusService) {}
  bus!: Bus;
  busData!:BusData;
  ngOnInit(): void {}
  addBusForm = new FormGroup({
    busId: new FormControl(),
    busServiceNum: new FormControl(),
    busPlateNum: new FormControl(),
    busType: new FormControl(),
    busServiceType: new FormControl(),
    busCapacity: new FormControl(),
    startingPoint: new FormControl(),
    destination: new FormControl(),
    busStops: new FormControl(),
    busDuration: new FormControl(),
    scheduleDepartureDateTime: new FormControl(),
    scheduleArrivalDateTime: new FormControl(),
    estimatedArrivalDateTime: new FormControl(),
    fareAmount: new FormControl(),
    fareTax: new FormControl(),
    totalFare: new FormControl(),
    flexiTicket: new FormControl(),
    movieEnabled: new FormControl(),
    rating: new FormControl(),
    runningStatus: new FormControl(),
  });
  onAddBus = () => {
    console.log(this.addBusForm.value);
        // this.busData=this.addBusForm.value;
    this._busService.addBus(this.bus).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  };
}
