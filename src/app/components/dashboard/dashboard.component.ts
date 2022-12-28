import { Component,AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  

  show: Boolean = false;
  busList: Bus[] = [];
  isShown: boolean = false;
  bus!:Bus;
  userRoles!:string[];
 user!:string;
 pageEvent!: PageEvent;
 
  constructor(private _busService: BusService, private _router: Router,private _authService:AuthService) {}
  
  ngOnInit(): void {
  
   

    this._busService.getBusData().subscribe({
      next: (data) => {
        console.log(data);
        // console.log(this.user);

        this.busList = data;

      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
   
  displayedColumns: string[] = [
    'busId',
    'busServiceNum',
    'busPlateNum',
    'busType',
    'busServiceType',
    'busCapacity',
    'startingPoint',
    'destination',
    'busStops',
    'busDuration',
    'scheduleDepartureDateTime',
    'scheduleArrivalDateTime',
    'estimatedArrivalDateTime',
    'fareAmount',
    'fareTax',
    'totalFare',
    'flexiTicket',
    'movieEnabled',
    'rating',
    'runningStatus',
    'editBusData',
    'deleteBusData'
  
  ];
chooser:string[]=["true","false"]


  onAddBus(addBusForm:NgForm){
console.log(addBusForm.value);
this.bus=addBusForm.value;
console.log(this.bus);
  }

  showDetails(bus:Bus){
    this._router.navigate(['/view-details',bus.busId]);

  }

  // getServerData(event?:PageEvent){
  //   this.fooService.getdata(event).subscribe(
  //     response =>{
  //       if(response.error) {
  //         // handle error
  //       } else {
  //         this.datasource = response.data;
  //         this.pageIndex = response.pageIndex;
  //         this.pageSize = response.pageSize;
  //         this.length = response.length;
  //       }
  //     },
  //     error =>{
  //       // handle error
  //     }
  //   );
  //   return event;
  // }
}
