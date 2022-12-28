import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { DatePipe } from '@angular/common';


interface BusData {
  value: string;
  // viewValue: string;
}

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  // show: Boolean = false;
  // busList: Bus[] = [];
  // isShown: boolean = true;
 
  bus!: Bus;
  editBus!:Bus

  chooser: boolean[] = [true, false];
  busTypeSelect: BusData[] = [
    { value: 'Electric' },
    { value: 'Petrol' },
    { value: 'Diesel' },
    { value: 'EcoFriendly' },
  ];
  busServiceTypeSelect: BusData[] = [
    { value: 'Seater' },
    { value: 'Sleeper' },
  ];
  constructor(private _authService: AuthService,private _busService:BusService, private _datepipe:DatePipe) {
    // this._datepipe.transform(this.bus.estimatedArrivalDateTime, 'medium');
    // console.log("Here");
    // console.log(this.bus.estimatedArrivalDateTime );
  }
  ngOnInit(): void {
    // this.bus=new Bus(0,0,'','','',0,'','',0,'',new Date(0,0,0,0,0),new Date(0,0,0,0,0),new Date(0,0,0,0,0),0,0,0,true,true,0,true)

    // new Date(year, monthIndex, day, hours, minutes)


    /*this.editBus={
      busId:0,
      busServiceNum:0,
      busPlateNum:'',
      busType:'',
      busServiceType:'',
      busCapacity:0,
      startingPoint:'',
      destination:'',
      busStops:0,
      busDuration:'',
      scheduleDepartureDateTime:new Date(),
      scheduleArrivalDateTime:new Date(),
      estimatedArrivalDateTime:new Date(),
      fareAmount:0,
      fareTax:0,
      totalFare:0,
      flexiTicket:false,
      movieEnabled:false,
      rating:0,
      runningStatus:true,
      
    }*/

    this._busService.getBusById(1).subscribe({
      next: (data) => {
        this.addBusForm.setValue(data)
        console.log(data);
      }
      })
    // this.addBusForm.patchValue({scheduleDepartureDateTime:new Date("2023-01-14T06:00:00.000+00:00"),flexiTicket:false})
    
  }
  
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
  onAddBus(addBus: any) {
    // console.log(this.addBusForm.value);
    // this.bus=addBus.value;
    console.log(this.bus);
console.log(addBus.value);
    // console.log(this.bus);
    /*this._busService.addBus(addBus.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      // error: (error) => {
      //   console.log(error);
      // },
      // complete: () => {
      //   console.log('complete');
      // },
    });/*/
 
  }
// onclick(){
//   this._busService.getBusById("1").subscribe({
//     next: (data) => {
//       console.log(data);
//       // console.log(this.user);

//       this.editBus = data;

//     },
//     error: (error) => {
//       console.log(error);
//     },
//     complete: () => {
//       console.log('complete');
//     },
//   });
// }

}
